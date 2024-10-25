import { ThemeContext } from "@vuo/context/ThemeContext";
import useStackNavigator from "@vuo/hooks/StackNavigator";
import Page from "@vuo/templates/Page";
import { useContext, useEffect, useState } from "react";
import { Avatar } from "../atoms/Avatar";

import { PlusOutlined } from "@ant-design/icons";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Section from "../atoms/Section";
import styles from "./ProfilePage.module.scss";

const ProfilePage = function () {
  const { toggleTheme } = useContext(ThemeContext);
  const [profileData, setProfileData] = useState<any>(null); // Ensure it's typed correctly
  const { navigateWithState } = useStackNavigator();
  const [diets, setDiets] = useState<string>("");
  const [allergies, setAllergies] = useState<string>("");
  const [likes, setLikes] = useState<string>("");

  useEffect(() => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      delete parsedProfile.completedSteps; // Remove the completedSteps key
      setProfileData(parsedProfile); // Set the modified profile data
    }
  }, []);

  //TODO fix this creappy UI

  return (
    <Page>
      <div className={styles.profilePage__avatar}>
        <Avatar src="https://placehold.co/50x50" alt="Image profile" />
        <div className={styles.profilePage__avatarInfo}>
          <p className={styles.profilePage__avatarInfo__name}>Shawn</p>
          <p className={styles.profilePage__avatarInfo__role}>Umami Master</p>
        </div>
      </div>

      <div>
        <h4>Your preferences</h4>
      </div>

      <Section>
        <h2>Diets</h2>

        <div className={styles.profilePage__section__input}>
          <Input
            value={diets}
            placeholder="Add a diet"
            onChange={(e) => {
              setDiets(e.target.value);
            }}
            className={styles.profilePage__section__input__text}
          />

          <Button variant="medium" color="primary">
            Add <PlusOutlined />
          </Button>
        </div>
      </Section>

      <Section>
        <h2>Allergy</h2>
        <div className={styles.profilePage__section__input}>
          <Input
            value={allergies}
            placeholder="Add a diet"
            onChange={(e) => {
              setAllergies(e.target.value);
            }}
            className={styles.profilePage__section__input__text}
          />

          <Button variant="medium" color="primary">
            Add <PlusOutlined />
          </Button>
        </div>
      </Section>

      <Section>
        <h2>Likes</h2>
        <div className={styles.profilePage__section__input}>
          <Input
            value={likes}
            placeholder="Add a diet"
            onChange={(e) => {
              setLikes(e.target.value);
            }}
            className={styles.profilePage__section__input__text}
          />

          <Button variant="medium" color="primary">
            Add <PlusOutlined />
          </Button>
        </div>
      </Section>

      {/* {profileData && (
        <div>
          <h4>Your Dietary Preferences</h4>
          {Object.entries(profileData).map(([key, value]) => {
            // Skip rendering if the value is an object but not an array
            if (typeof value === "object" && !Array.isArray(value)) {
              return null;
            }

            return (
              <div key={key} style={{ marginBottom: "1rem" }}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                {Array.isArray(value) ? (
                  <ul>
                    {value.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{value}</p>
                )}
              </div>
            );
          })}
        </div>
      )} */}

      {/* Optional Theme Button */}
      {/* <Button
        variant="large"
        color="primary"
        onClick={() => {
          navigateWithState("/onboarding");
        }}
      >
        Edit
      </Button>
      <Button
        tabIndex={0}
        block
        variant="large"
        type="submit"
        color="primary"
        onClick={() => {
          toggleTheme();
        }}
      >
        Change Theme
      </Button> */}
    </Page>
  );
};

export default ProfilePage;
