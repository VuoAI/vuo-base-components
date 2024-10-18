import { observer } from "mobx-react-lite";


import { Grid } from "antd-mobile";
import VirtualSear from '@vuo/components/organisms/VirtualSear';
import styles from './Minigames.module.scss'
import CutGuessr from "../organisms/CutGuessr";
import ConversationStarter from "../organisms/ConversationStarter";

const Minigames = observer(() => {

  const onSelectMinigame = () => {

  };

  const onClose = () => {
    console.log('onClose');
  };

  return (
    <div className={styles.sneak_peek_body}>
      <Grid columns={1} gap={20} style={{ justifyItems: 'center' }}>

        <VirtualSear allowPlayAgain />

        <CutGuessr allowPlayAgain />

         <CutGuessr allowPlayAgain presetAnimal="Cow" /> 

        <CutGuessr allowPlayAgain presetAnimal="Pig" /> 

        <CutGuessr allowPlayAgain presetAnimal="Chicken" /> 

        <ConversationStarter allowReplay />

      </Grid>
    </div>
  )
});

export default Minigames;