import assert from 'node:assert/strict';
import test from 'node:test';
import {localizePost, normalizeLocale, normalizeTranslations, originalNotice} from '../lib/postI18n.ts';
const post = {title:'Charging',summary:'Guide',category:'Engineering',content:'Use the specified charge current.',translations:{zh_CN:{title:'充电',content:'请使用规定的充电电流。'},de:{title:'Laden'}}};
test('legacy Chinese locale keys resolve full translations', () => {
 assert.equal(normalizeLocale('zh_CN'),'zh-CN');
 assert.equal(localizePost(post,'zh-CN').content,'请使用规定的充电电流。');
 assert.equal(localizePost(post,'zh-CN').showingOriginal,false);
});
test('switching back to English restores source', () => {
 assert.equal(localizePost(post,'en').content,post.content);
 assert.equal(localizePost(post,'en').showingOriginal,false);
});
test('partial translations retain title and honestly report original body', () => {
 const value=localizePost(post,'de');assert.equal(value.title,'Laden');assert.equal(value.content,post.content);assert.equal(value.showingOriginal,true);
});
test('legacy copied bodies are not treated as translations', () => {
 const value=localizePost({...post,translations:{ja:{content:post.content}}},'ja');assert.equal(value.showingOriginal,true);
});
test('all advertised locales have fallback notices', () => {assert.equal(Object.keys(originalNotice).length,14);assert.deepEqual(normalizeTranslations(),{});});
