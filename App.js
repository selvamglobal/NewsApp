import React from 'react';
import { Text, View, StyleSheet,ActivityIndicator, Alert} from 'react-native';
import { Container, Header, Icon, Body, Title, Left,Button,Content, List, ListItem } from 'native-base';
import  DataItem from './src/components/list_item';
import { getArticles } from './src/services/news';
import Modal from './src/components/model';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this._handleItemDataOnPress = this._handleItemDataOnPress.bind(this)
    this._handleModalClose = this._handleModalClose.bind(this)
    this.state = {
      isLoading: true,
      data: null,
      isError: false,
      setModalVisible: false,
      modalArticleData: {}
  } 
  }
  _handleItemDataOnPress(articleData) {
    this.setState({
        setModalVisible: true,
        modalArticleData: articleData
    })
}
componentDidMount() {
  getArticles().then(data => {
      this.setState({
          isLoading: false,
          data: data
      })
  }, error => {
      Alert.alert("Error", "Something happend, please try again")
  })
}
  _handleModalClose() {
    this.setState({
        setModalVisible: false,
        modalArticleData: {}
    })
}
  render() {
    let view = this.state.isLoading ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator animating={this.state.isLoading} color="#00f0ff" />
          <Text style={{ marginTop: 8 }} children="Please wait..." />
      </View>
  ) : (
          <List
              dataArray={this.state.data}
              renderRow={(item) => {
                  return (
                      <ListItem>
                          <DataItem onPress={this._handleItemDataOnPress} data={item} />
                      </ListItem>
                  )
              }} />

      )
    return (
      <Container>
        <Header style={{ backgroundColor: '#635DB7', height: 50 }}>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Headlines India</Title>
          </Body>
          
        </Header>
        <Content
        contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}
        padder={false}>
            {view}
    </Content>
    <Modal 
        showModal={this.state.setModalVisible}
        articleData={this.state.modalArticleData}
        onClose={this._handleModalClose}/>
       
      </Container>
    );
  }
}

const styles = StyleSheet.create({

});