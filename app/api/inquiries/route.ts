import { NextResponse } from 'next/server';
import { fetchAllInquiries, saveInquiry, removeInquiry, updateInquiryStatus } from '@/lib/store';

export async function GET() {
  const inquiries = await fetchAllInquiries();
  
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

    // Trigger Email Notification to 666lvdeshui@gmail.com
    const recipientEmail = '666lvdeshui@gmail.com';
    const emailSubject = `【VSZAPOWER 网站咨询提醒】收到来自 ${saved.name} 的产品询价`;
    const emailContent = `
尊敬的管理员，

您的 VSZAPOWER 官方网站（vszapower-store.vercel.app）收到一条新的客户咨询：

--------------------------------------------------
👤 客户姓名: ${saved.name}
📞 联系方式: ${saved.contact}
📦 咨询意向产品: ${saved.product}
💬 留言内容: ${saved.message}
⏰ 提交时间: ${new Date(saved.created_at).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}
--------------------------------------------------

请尽快登录后台处理并与客户联系：
🔗 后台管理面板: https://vszapower-store.vercel.app/admin

VSZAPOWER 自动通知系统
`;

    // Attempting to send email via Resend API if process.env.RESEND_API_KEY is present
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'VSZAPOWER Inquiry <notifications@vszapower.com>',
            to: [recipientEmail],
            subject: emailSubject,
            text: emailContent,
          }),
        });
        console.log(`[Email Notification] Email sent successfully to ${recipientEmail}`);
      } catch (err) {
        console.warn('[Email Notification] Resend fetch error:', err);
      }
    } else {
      console.log(`[Email Notification Alert] Target: ${recipientEmail}\nSubject: ${emailSubject}\n${emailContent}`);
    }

    return NextResponse.json({ success: true, inquiry: saved });
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
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
