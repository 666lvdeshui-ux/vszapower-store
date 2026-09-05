const copy: Record<string, string[]> = {
 en: ['Battery Academy', 'Coin cell selection and charging guides', 'Search articles…', 'List', 'Grid', 'Category', 'All', 'Articles', 'No articles found', 'Try another keyword or category.', 'Reset filters'],
 'zh-CN': ['电池学院', '纽扣电池选型与充电指南', '搜索文章…', '列表', '网格', '分类', '全部', '文章数量', '未找到相关文章', '请尝试其他关键词或分类。', '重置筛选'],
 'zh-HK': ['電池學院', '鈕扣電池選型與充電指南', '搜尋文章…', '列表', '網格', '分類', '全部', '文章數量', '找不到相關文章', '請嘗試其他關鍵字或分類。', '重設篩選'],
 'zh-TW': ['電池學院', '鈕扣電池選型與充電指南', '搜尋文章…', '清單', '網格', '分類', '全部', '文章數量', '找不到相關文章', '請嘗試其他關鍵字或分類。', '重設篩選'],
 de: ['Batterie-Akademie', 'Auswahl und Laden von Knopfzellen', 'Artikel suchen…', 'Liste', 'Raster', 'Kategorie', 'Alle', 'Artikel', 'Keine Artikel gefunden', 'Versuchen Sie andere Suchbegriffe oder Kategorien.', 'Filter zurücksetzen'],
 ja: ['電池アカデミー', 'コイン電池の選定と充電ガイド', '記事を検索…', 'リスト', 'グリッド', 'カテゴリー', 'すべて', '記事数', '記事が見つかりません', '別のキーワードやカテゴリーをお試しください。', '条件をリセット'],
 ko: ['배터리 아카데미', '코인 전지 선택 및 충전 안내', '기사 검색…', '목록', '격자', '분류', '전체', '기사 수', '기사를 찾을 수 없습니다', '다른 검색어나 분류를 선택하세요.', '필터 초기화'],
 es: ['Academia de baterías', 'Guías de selección y carga de pilas botón', 'Buscar artículos…', 'Lista', 'Cuadrícula', 'Categoría', 'Todas', 'Artículos', 'No se encontraron artículos', 'Pruebe otra palabra clave o categoría.', 'Restablecer filtros'],
 fr: ['Académie des piles', 'Guides de sélection et de charge des piles bouton', 'Rechercher des articles…', 'Liste', 'Grille', 'Catégorie', 'Toutes', 'Articles', 'Aucun article trouvé', 'Essayez un autre mot-clé ou une autre catégorie.', 'Réinitialiser les filtres'],
 pt: ['Academia de baterias', 'Guias de seleção e carga de pilhas botão', 'Pesquisar artigos…', 'Lista', 'Grade', 'Categoria', 'Todas', 'Artigos', 'Nenhum artigo encontrado', 'Tente outra palavra-chave ou categoria.', 'Redefinir filtros'],
 ru: ['Академия батарей', 'Выбор и зарядка дисковых аккумуляторов', 'Поиск статей…', 'Список', 'Сетка', 'Категория', 'Все', 'Статьи', 'Статьи не найдены', 'Попробуйте другое слово или категорию.', 'Сбросить фильтры'],
 vi: ['Học viện pin', 'Hướng dẫn chọn và sạc pin cúc áo', 'Tìm bài viết…', 'Danh sách', 'Lưới', 'Danh mục', 'Tất cả', 'Bài viết', 'Không tìm thấy bài viết', 'Thử từ khóa hoặc danh mục khác.', 'Đặt lại bộ lọc'],
 ar: ['أكاديمية البطاريات', 'أدلة اختيار وشحن البطاريات الزرية', 'ابحث عن مقالات…', 'قائمة', 'شبكة', 'الفئة', 'الكل', 'المقالات', 'لم يتم العثور على مقالات', 'جرّب كلمة أو فئة أخرى.', 'إعادة تعيين المرشحات'],
 he: ['אקדמיית הסוללות', 'מדריכי בחירה וטעינה לסוללות כפתור', 'חיפוש מאמרים…', 'רשימה', 'רשת', 'קטגוריה', 'הכול', 'מאמרים', 'לא נמצאו מאמרים', 'נסו מילת חיפוש או קטגוריה אחרת.', 'איפוס מסננים'],
};
export function academyCopy(lang: string) {
 const [title, description, search, list, grid, category, all, count, empty, hint, reset] = copy[lang] || copy.en;
 return {title, description, search, list, grid, category, all, count, empty, hint, reset};
}
