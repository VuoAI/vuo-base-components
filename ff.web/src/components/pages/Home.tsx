import Button from "../atoms/Button";
import Page from "../templates/Page";
import useStackNavigator from "@vuo/utils/StackNavigator";
import Section from "../atoms/Section";
import { useAppContext } from "@vuo/context/AppContext";
import QuestBrowseViewModel from "@vuo/viewModels/QuestBrowseViewModel";
import { useState } from "react";

const Home = () => {

    const { navigateWithState } = useStackNavigator();  // Initialize navigateWithState function
    const { isOnboardingComplete } = useAppContext()
    const [viewModel] = useState<QuestBrowseViewModel>(
        () => new QuestBrowseViewModel(),
      );

    const userAccount = JSON.parse(localStorage.getItem('SessionDataStore')).user

    const goToQuest = () => {
        // Save the target route to session storage before navigating
        navigateWithState('/home/quests');
    };

    const goToOnboading = () => {  
        //creating shadow account
        //check if sessiondatastore has shadowuser account 
        //if yes then navigate to onboarding
        // Save the target route to session storage before navigating
        if(
            userAccount?.shadowAccount === true
        ) {
            navigateWithState('/onboarding');
        } else {
            alert("creating shadow account")
            navigateWithState('/onboarding');
            viewModel.createShadowAccount()
            .then((shadowAccountUserId) => {
                //use the shadowAccountUserId to create an empty profile
                viewModel.createUserProfile(shadowAccountUserId)
            })
            .catch((error: Error) => {
                console.error(error)
            })
            .finally(() => {
                //TODO handle loading state, then navigatie
                navigateWithState('/onboarding');
            })
        }
        //if no then

    }
  
    return (
        <Page>
            <Section>
                <h2>Welcome to Fix food</h2>
                <p>Click the button below to start your adventure!</p>
                <Button onClick={goToQuest}>Start Quest</Button>
            </Section>
            {
                !isOnboardingComplete && <Section>
                    {
                        localStorage.getItem('onboardingData') 
                        ? (
                            <>
                            <h2>Finish your onboarding process!</h2>
                            {/* <h3>some progress bar here</h3> */}
                            <Button onClick={goToOnboading}>Continue</Button>
                            </>
                        )
                        : (
                            <div>
                                <h2>Start onboarding here</h2>
                                <Button onClick={goToOnboading}>Start</Button>
                            </div>
                        )
                    }
                </Section>

            }

        </Page>
    );
  };

export default Home;