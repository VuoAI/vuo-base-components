import { useParams } from 'react-router-dom';
import KetoSneakPeek from "@vuo/sneakPeekPages/keto"
import KetoFirstWeekSneakPeek from "@vuo/sneakPeekPages/keto_first_week"
import EasyRecipes from './sneakPeekPages/easy_recipes';
import FamilyDemo from './sneakPeekPages/family_demo'
import AnibalFavorites from './sneakPeekPages/anibal_favorites';
import LearningQuestlineTest from './sneakPeekPages/learn_questline_test';

type ComponentMap = {
  [key: string]: React.ComponentType
}

const componentMap: ComponentMap = {
  keto: KetoSneakPeek,
  keto_first_week: KetoFirstWeekSneakPeek,
  easy_recipes: EasyRecipes,
  family_demo: FamilyDemo,
  anibal_favorites: AnibalFavorites,
  learning_questline_test: LearningQuestlineTest
}

function DynamicSneakPeek () {
  const { id } = useParams();
  if (!id) {
    return <div>Page not found</div>
  }
  const Component = componentMap[id];
  return Component ? <Component /> : <div>Page not found</div>;
};

export default DynamicSneakPeek;
