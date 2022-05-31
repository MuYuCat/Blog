import { getPoetryToken, getPoetrySentence, getHitokoto } from '../../api/poetry';
import usePoetryStore from '../../store/poetry';
import { POETRY_TOKEN } from '../../content';

const poetryStore = usePoetryStore();

// 诗歌-获取诗歌
const getPoetry = async () => {
  if (!localStorage.getItem(POETRY_TOKEN)) {
    await getPoetryToken().then((res) => {
      if (`${res.status}` === 'success') {
        localStorage.setItem(POETRY_TOKEN, res?.data);
      }
    });
  }
  await getPoetrySentence().then((res) => {
    poetryStore.updateCacheAt(res?.data?.cacheAt);
    poetryStore.updateContent(res?.data?.content);
    poetryStore.updateMatchTags(res?.data?.matchTags);
    poetryStore.updateAuthor(res?.data?.origin?.author);
    poetryStore.updateContents(res?.data?.origin?.content);
    poetryStore.updateDynasty(res?.data?.origin?.dynasty);
    poetryStore.updateTitle(res?.data?.origin?.title);
    poetryStore.updatePopularity(res?.data?.popularity);
    // @ts-ignore
    poetryStore.updateWarning(res?.warning);
  });
};

// 一言-获取语句
const getHitokotoInfo = async () => {
  await getHitokoto().then((res: any) => {
    console.log(res);
  });
};

export { getPoetry, getHitokotoInfo };
