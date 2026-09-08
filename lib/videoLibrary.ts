import footage from '@/content/video-library/public.json';
import type { VideoItem } from './store';
export const ownedVideos = footage;
export function videoInfo(video: VideoItem) {
  // An admin replacement remains authoritative and must not inherit stale metadata.
  return footage.find(item => item.id === video.id && item.video_url === video.video_url);
}
export function localizedVideo(video: VideoItem, lang: string) {
  const info = videoInfo(video);
  const chinese = lang.startsWith('zh');
  return {
    title: chinese && info && video.title === info.title ? info.titleZh : video.title,
    description: chinese && info && video.description === info.description ? info.descriptionZh : video.description,
  };
}
export function videoPath(video: VideoItem) { return `/videos/${encodeURIComponent(video.id)}`; }
export function videoSchema(video: VideoItem) {
  const info = videoInfo(video);
  if (!info || !video.created_at || !video.poster_url) return null;
  return {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    name: video.title, description: video.description, thumbnailUrl: [video.poster_url],
    uploadDate: video.created_at, duration: `PT${info.durationSeconds}S`,
    contentUrl: video.video_url, inLanguage: info.language,
    url: `https://www.vszapower.com${videoPath(video)}`,
    publisher: { '@type': 'Organization', name: 'VSZAPOWER', url: 'https://www.vszapower.com' },
  };
}
const ui: Record<string, string[]> = {
  en: ['Product Video Library','Own-product footage of VSZAPOWER coin cells and chargers.','All videos','Clip chargers','Legacy chargers','Rechargeable cells','Primary cells','Search model or video','Watch video','View all videos','No matching videos','Original audio','Selected footage','Match the cell chemistry, device voltage and charger configuration before use. Never recharge primary CR or LR cells.'],
  zh_CN: ['产品视频库','VSZAPOWER 自有纽扣电池与充电器实拍视频。','全部视频','夹式充电器','老款充电器','可充电电池','一次性电池','搜索型号或视频','观看视频','查看全部视频','暂无匹配视频','原声语言','精选片段','使用前核对电池化学体系、设备电压和充电器版本。CR、LR 一次性电池禁止充电。'],
  zh_TW: ['產品影片庫','VSZAPOWER 自有鈕扣電池與充電器實拍影片。','全部影片','夾式充電器','舊款充電器','可充電電池','一次性電池','搜尋型號或影片','觀看影片','查看全部影片','沒有符合的影片','原聲語言','精選片段','使用前核對電池化學體系、設備電壓與充電器版本。CR、LR 一次性電池禁止充電。'],
  zh_HK: ['產品影片庫','VSZAPOWER 自有鈕扣電池與充電器實拍影片。','全部影片','夾式充電器','舊款充電器','可充電電池','一次性電池','搜尋型號或影片','觀看影片','查看全部影片','沒有符合的影片','原聲語言','精選片段','使用前核對電池化學體系、設備電壓與充電器版本。CR、LR 一次性電池禁止充電。'],
  de: ['Produktvideothek','Originalaufnahmen von VSZAPOWER Knopfzellen und Ladegeräten.','Alle Videos','Clip-Ladegeräte','Ältere Ladegeräte','Akkus','Primärzellen','Modell oder Video suchen','Video ansehen','Alle Videos ansehen','Keine passenden Videos','Originalsprache','Ausgewählte Szenen','Zellchemie, Gerätespannung und Ladegerät vor Gebrauch abgleichen. Primäre CR- und LR-Zellen niemals aufladen.'],
  ja: ['製品動画ライブラリ','VSZAPOWER ボタン電池と充電器の実写動画。','すべて','クリップ式充電器','旧型充電器','充電式電池','一次電池','型番・動画を検索','動画を見る','すべての動画','該当する動画なし','音声言語','抜粋映像','使用前に電池の化学系、機器電圧、充電器仕様を確認してください。CR・LR一次電池は充電禁止です。'],
  es: ['Biblioteca de vídeos','Vídeos propios de pilas de botón y cargadores VSZAPOWER.','Todos','Cargadores de pinza','Cargadores anteriores','Recargables','Pilas primarias','Buscar modelo o vídeo','Ver vídeo','Ver todos','Sin resultados','Audio original','Selección de escenas','Compruebe la química, el voltaje del dispositivo y el cargador. Nunca recargue pilas primarias CR o LR.'],
  ko: ['제품 동영상','VSZAPOWER 코인 전지와 충전기 실제 영상.','전체','클립 충전기','구형 충전기','충전지','일차 전지','모델 또는 영상 검색','영상 보기','전체 영상 보기','결과 없음','원본 음성','선별 장면','사용 전 전지 화학계, 기기 전압 및 충전기 사양을 확인하세요. CR 및 LR 일차 전지는 충전하지 마세요.'],
  fr: ['Vidéothèque produits','Vidéos originales des piles bouton et chargeurs VSZAPOWER.','Toutes','Chargeurs à pince','Anciens chargeurs','Rechargeables','Piles primaires','Rechercher un modèle','Voir la vidéo','Toutes les vidéos','Aucun résultat','Audio original','Extraits','Vérifiez la chimie, la tension de l’appareil et le chargeur. Ne rechargez jamais les piles primaires CR ou LR.'],
  pt: ['Biblioteca de vídeos','Vídeos próprios das pilhas botão e carregadores VSZAPOWER.','Todos','Carregadores de clipe','Carregadores antigos','Recarregáveis','Pilhas primárias','Buscar modelo ou vídeo','Assistir','Ver todos','Sem resultados','Áudio original','Trechos selecionados','Confira a química, a tensão do aparelho e o carregador. Nunca recarregue pilhas primárias CR ou LR.'],
  ru: ['Видеотека продукции','Собственные видео элементов питания и зарядных устройств VSZAPOWER.','Все','Зарядные зажимы','Старые модели','Аккумуляторы','Первичные элементы','Поиск модели или видео','Смотреть','Все видео','Нет результатов','Язык оригинала','Избранные фрагменты','Проверьте химию элемента, напряжение устройства и зарядное устройство. Не заряжайте первичные CR и LR.'],
  vi: ['Thư viện video sản phẩm','Video thực tế pin cúc áo và bộ sạc VSZAPOWER.','Tất cả','Bộ sạc kẹp','Bộ sạc đời cũ','Pin sạc','Pin dùng một lần','Tìm mẫu hoặc video','Xem video','Xem tất cả','Không có kết quả','Âm thanh gốc','Đoạn chọn lọc','Kiểm tra hóa học pin, điện áp thiết bị và cấu hình bộ sạc. Không sạc pin CR hoặc LR dùng một lần.'],
  ar: ['مكتبة فيديو المنتجات','مقاطع أصلية لبطاريات وشواحن VSZAPOWER.','الكل','شواحن مشبكية','شواحن قديمة','بطاريات قابلة للشحن','بطاريات أولية','ابحث عن طراز أو فيديو','شاهد الفيديو','عرض الكل','لا توجد نتائج','لغة الصوت','مقاطع مختارة','تحقق من كيمياء البطارية وجهد الجهاز ومواصفات الشاحن. لا تشحن البطاريات الأولية CR أو LR.'],
  he: ['ספריית סרטוני מוצרים','סרטונים מקוריים של סוללות ומטעני VSZAPOWER.','הכול','מטעני קליפס','מטענים ישנים','סוללות נטענות','סוללות ראשוניות','חיפוש דגם או סרטון','צפייה','כל הסרטונים','אין תוצאות','שפת המקור','קטעים נבחרים','בדקו את כימיית הסוללה, מתח המכשיר ומפרט המטען. אין לטעון סוללות ראשוניות CR או LR.'],
};
export function videoCopy(lang: string) {
  const v = ui[lang.replace('-', '_')] || ui[lang] || ui.en;
  return { title:v[0],intro:v[1],all:v[2],clip:v[3],legacy:v[4],battery:v[5],primary:v[6],search:v[7],watch:v[8],viewAll:v[9],empty:v[10],audio:v[11],edited:v[12],safety:v[13] };
}
