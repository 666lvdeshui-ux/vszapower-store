import { NextResponse } from 'next/server';
import { fetchAllInquiries, saveInquiry, removeInquiry, updateInquiryStatus, InquiryItem } from '@/lib/store';
import fs from 'fs';
import path from 'path';

const INQUIRIES_FILE = path.join('/tmp', 'vszapower_inquiries.json');

function getStoredInquiries(): InquiryItem[] {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {}
  return [];
}

function persistInquiries(list: InquiryItem[]) {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (e) {}
}

export async function GET() {
  const storeInquiries = await fetchAllInquiries();
  const fileInquiries = getStoredInquiries();

  // Merge by ID
  const map = new Map<string, InquiryItem>();
  storeInquiries.forEach(item => map.set(item.id, item));
  fileInquiries.forEach(item => map.set(item.id, item));

  const inquiries = Array.from(map.values()).sort((a, b) => {
    return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
  });

  // Calculate today's inquiry count
  const todayStr = new Date().toISOString().split('T')[0];
  const todayInquiries = inquiries.filter(item => {
    if (!item.created_at) return false;
    return item.created_at.startsWith(todayStr);
  });

  return NextResponse.json({
    inquiries,
    totalCount: inquiries.length,
    todayCount: todayInquiries.length,
    pendingCount: inquiries.filter(i => i.status === 'new').length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const saved = await saveInquiry(body);

    const recipientEmail = '666lvdeshui@gmail.com';
    let emailStatusMessage = '';

    // 1. Send via FormSubmit AJAX service to 666lvdeshui@gmail.com
    const senderEmail = (saved.contact && saved.contact.includes('@')) ? saved.contact : '666lvdeshui@gmail.com';

    try {
      const emailRes = await fetch('https://formsubmit.co/ajax/666lvdeshui@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://www.vszapower.com',
          'Referer': 'https://www.vszapower.com/',
        },
        body: JSON.stringify({
          _subject: `【VSZAPOWER 网站新询价】来自 ${saved.name} 的产品咨询`,
          _captcha: 'false',
          _template: 'table',
          email: senderEmail,
          _replyto: senderEmail,
          '客户姓名 Name': saved.name,
          '所属国家 Country': saved.country || '未填写 (Not Specified)',
          '联系方式 Contact': saved.contact,
          '意向产品 Product': saved.product,
          '留言内容 Message': saved.message,
          '提交时间 Time': new Date(saved.created_at).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
        }),
      });
      const emailJson = await emailRes.json();
      if (emailJson.message && emailJson.message.includes('Activation')) {
        emailStatusMessage = 'FormSubmit 激活邮件已派送至 666lvdeshui@gmail.com，请登录 Gmail 邮箱（或检查垃圾箱）点击【Activate Form】链接确认一次即可激活！';
      } else {
        emailStatusMessage = emailJson.message || 'Email dispatched successfully';
      }
    } catch (emailErr) {
      console.error('[Email Dispatch Error]:', emailErr);
    }

    // 2. Resend API Fallback if configured
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'VSZAPOWER <onboarding@resend.dev>',
            to: [recipientEmail],
            subject: `【VSZAPOWER 网站新询价】来自 ${saved.name} 的产品咨询`,
            text: `收到新咨询：\n姓名: ${saved.name}\n所属国家: ${saved.country || '未填写'}\n联系方式: ${saved.contact}\n意向产品: ${saved.product}\n留言内容: ${saved.message}`,
          }),
        });
      } catch (err) {
        console.warn('[Resend API Error]:', err);
      }
    }

    // Save to persistent file store
    const currentList = getStoredInquiries();
    const existingIdx = currentList.findIndex(i => i.id === saved.id);
    if (existingIdx >= 0) {
      currentList[existingIdx] = saved;
    } else {
      currentList.unshift(saved);
    }
    persistInquiries(currentList);

    return NextResponse.json({ success: true, inquiry: saved, emailStatus: emailStatusMessage });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }
    const success = await updateInquiryStatus(id, status);

    const currentList = getStoredInquiries();
    const item = currentList.find(i => i.id === id);
    if (item) {
      item.status = status;
      persistInquiries(currentList);
    }

    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }
    const success = await removeInquiry(id);

    const currentList = getStoredInquiries().filter(i => i.id !== id);
    persistInquiries(currentList);

    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
