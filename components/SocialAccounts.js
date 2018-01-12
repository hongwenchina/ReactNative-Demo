import React from 'react';
import Dimensions from 'Dimensions';
import { Container, Content, Button, Icon, Text, H3, Card, CardItem, Right } from 'native-base';
import globalStyles from '../styles';

const styles = {
  welcome: { alignSelf: "center", marginTop: 50 },
  caption: { alignSelf: "center", marginTop: 20, marginBottom: 20 },
};

const SocialAccounts = ({ screenProps }) => {
  onLogout = () => {
    screenProps.loading();
    screenProps.gigya.logout();
  }

  onAddConnectionPressed = (provider) => {
    if(screenProps.account.socialProviders.includes(provider)) return;

    this.connectedProvider = provider;
    screenProps.loading();
    screenProps.gigya.addConnection(provider, error => this.onAddConnectionCompleted(error));
  };

  onAddConnectionCompleted = (error) => {
    screenProps.loading(true);
    if (error) {
      screenProps.notifyUser(error);
    } else {
      screenProps.gigya.getAccountInfo(this.onGetAccountInfoCompleted);
    }
  };

  onGetAccountInfoCompleted = (error, account) => {
    if (error) {
      screenProps.notifyUser(error);
    } else {
      screenProps.updateUserState(account);
      screenProps.notifyUser(`Social account ${this.connectedProvider} added successfully!`);
    }
  }

  getConnectionIcon = (provider) =>
    screenProps.account.socialProviders.includes(provider)
    ? <Icon name="checkmark-circle" /> : <Icon name="arrow-forward" />

  return(
    <Container style={globalStyles.container}>
      <Content>
        <H3 style={styles.welcome}>Manage Linked Social Accounts</H3>
        <Text style={styles.caption}>Linking your social account allows you to log in with one click.</Text>
        <Card>
          <CardItem button onPress={() => this.onAddConnectionPressed('facebook')}>
            <Icon active name="logo-facebook" />
            <Text>Facebook</Text>
            <Right>
              { getConnectionIcon('facebook') }
            </Right>
          </CardItem>
          <CardItem button onPress={() => this.onAddConnectionPressed('googleplus')}>
            <Icon active name="logo-googleplus" />
            <Text>Google Plus</Text>
            <Right>
              { getConnectionIcon('googleplus') }
            </Right>
          </CardItem>
          <CardItem button onPress={() => this.onAddConnectionPressed('twitter')}>
            <Icon active name="logo-twitter" />
            <Text>Twitter</Text>
            <Right>
            { getConnectionIcon('twitter') }
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}

export default SocialAccounts;
