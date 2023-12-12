import { Header } from "@components/Header";
import { Container, Content, Icon} from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup(){
    const [group, setGroup] = useState('');

    const navigation = useNavigation();

    async function handleNew(){
        try{
            if(group.trim().length === 0) {
                return Alert.alert('Novo grupo', 'Informe o nome da turma.');
            }
            await groupCreate(group)
            navigation.navigate('players', { group })
        }
        catch(error){
            if(error instanceof AppError){
                Alert.alert('Novo Grupo', error.message);
            }else{
                Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.')
                console.log(error);
            }
            
        }
            
    }

    return(
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <Highlight 
                    title={"Nova Turma"}
                    subtitle="crie uma turma para adicionar as pessoas"
                />

                <Input 
                    placeholder="Nome da turma"
                    onChangeText={setGroup}
                />

                <Button
                onPress={handleNew} 
                title="Criar"
                style={{marginTop: 20}}
                />
            </Content>
        </Container>


    );

}