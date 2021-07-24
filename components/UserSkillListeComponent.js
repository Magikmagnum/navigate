import React, { useState, useEffect, useContext } from "react";
import { RecoilState } from "recoil";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Context } from '../store/configureStore';
import { HeaderTitle, Category } from '../components/cardsComponent';
import { getUserSkill, API_IMG_SKILL } from '../store/API/RatisseurApi';
import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import { themeState } from '../store/atomes/theme';
import { yourskillState } from '../store/atomes/yourskill';




export default function UserSkillListe() {

    const [state, dispatch] = useContext(Context);
    const [yourSkills, setYourSkills] = useState(false);
    const [nextSkillView, setNextSkillView] = useRecoilState(yourskillState);
    const [themeStyle, setThemeStyle] = useRecoilState(themeState);
    const navigation = useNavigation();


    // recover user-skills from the database
    useEffect(() => {
        getUserSkill(state.compte.api_key)
            .then((result) => {
                if (result.errors) {
                    alert(result.message)
                } else {
                    // add in global state
                    console.log(result)
                    updateSkillList(result.data)
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])


    // generate the list of user skills
    useEffect(() => {
        // recover user skills the global state
        const skills = state.userSkills;
        if (skills != undefined) {
            const skillListe = skills.map((item) => {
                return <SkillIteme title={item.skills.name} key={item.id} imageUri={API_IMG_SKILL(item.imageName)} />
            })
            setYourSkills(skillListe);
        }
    }, [state])


    //dispatch in reduce
    async function updateSkillList(data) {

        await dispatch({ type: 'UPDATE_SKILL_LIST', payload: data.reverse() });
    }


    // Skill Iteme 
    const SkillIteme = ({ title, imageUri }) => {
        const subText = { fontSize: 13, color: '#222', color: themeStyle.subColor };
        return (
            <TouchableOpacity style={{ marginBottom: 20, flexDirection: 'row' }} onPress={() => {
                setNextSkillView({ title, imageUri });
                navigation.navigate('YourSkill');
            }}>
                <Category imageUri={imageUri} />
                <View style={{ flexDirection: 'column', marginHorizontal: 20, flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: themeStyle.color, marginBottom: 6 }}>{title}</Text>
                    <Text style={subText}>180 vue</Text>
                    <Text style={subText}>3 recomandation</Text>
                    <Text style={subText}>18 commentaire</Text>
                    <Text style={subText}>0 Partage</Text>
                </View>
                <View style={{ backgroundColor: 'red', height: 24, width: 24, marginRight: 20, borderRadius: 12, alignItems: "center", justifyContent: "center" }} >
                    <Text style={{ color: '#fff', fontSize: 10 }}>14</Text>
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <View style={{}}>
            <View style={{ marginHorizontal: 20 }}>
                <HeaderTitle color={themeStyle.color} subColor={themeStyle.subColor} title='Administré vos competence' subTitle="Ici vous pouvez administre vos competence." />
            </View>
            {yourSkills}
        </View>
    )
}