import {AppRegistry} from 'react-native';
import Todos from './Todos';

AppRegistry.registerComponent('RNFirebaseStarter', () => Todos);
import React from 'react';

class Todos extends React.Component {
    render() {
        return null;
    }
}

export default Todos;

class Todos extends React.Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('todos');
    }

}

import {ScrollView, View, Text, TextInput, Button} from 'react-native';

...

render()
{
    return (
        <View>
            <ScrollView>
                <Text>List of TODOs</Text>
            </ScrollView>
            <TextInput
                placeholder={'Add TODO'}
            />
            <Button
                title={'Add TODO'}
                disabled={true}
                onPress={() => {
                }}
            />
        </View>
    );
}

constructor()
{
    super();
    this.ref = firebase.firestore().collection('todos');
    this.state = {
        textInput: '',
    };
}


updateTextInput(value)
{
    this.setState({textInput: value});
}

<TextInput
    placeholder={'Add TODO'}
    value={this.state.textInput}
    onChangeText={(text) => this.updateTextInput(text)}
/>

< Button
title = {'Add TODO'}
disabled = {
!this.state.textInput.length
}
onPress = {()
=>
{
}
}
/>

addTodo()
{
    this.ref.add({
        title: this.state.textInput,
        complete: false,
    });

    this.setState({
        textInput: '',
    });
}


<Button
    title={'Add TODO'}
    disabled={!this.state.textInput.length}
    onPress={() => this.addTodo()}
/>


constructor()
{
    super();
    this.ref = firebase.firestore().collection('todos');
    this.unsubscribe = null;

    this.state = {
        textInput: '',
        loading: true,
        todos: [],
    };
}


componentDidMount()
{
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
}

componentWillUnmount()
{
    this.unsubscribe();
}

onCollectionUpdate = (querySnapshot) => {
    // TODO
}

onCollectionUpdate = (querySnapshot) => {
    const todos = [];
    querySnapshot.forEach((doc) => {
        const {title, complete} = doc.data();

        todos.push({
            key: doc.id,
            doc, // DocumentSnapshot
            title,
            complete,
        });
    });

    this.setState({
        todos,
        loading: false,
    });


    render()
    {
        if (this.state.loading) {
            return null; // or render a loading icon
        }


        import {FlatList, Button, View, Text, TextInput} from 'react-native';
        import Todo from './Todo'; // we'll create this next
    ...
        render()
        {
            if (this.state.loading) {
                return null; // or render a loading icon
            }

            return (
                <View style={{flex: 1}}>
                    <FlatList
                        data={this.state.todos}
                        renderItem={({item}) => <Todo {...item} />}
                    />
                    <TextInput
                        placeholder={'Add TODO'}
                        value={this.state.textInput}
                        onChangeText={(text) => this.updateTextInput(text)}
                    />
                    <Button
                        title={'Add TODO'}
                        disabled={!this.state.textInput.length}
                        onPress={() => this.addTodo()}
                    />
                </View>
            );
        }


        import React from 'react';
        import {TouchableHighlight, View, Text} from 'react-native';

        export default class Todo extends React.PureComponent {
            // toggle a todo as completed or not via update()
            toggleComplete() {
                this.props.doc.ref.update({
                    complete: !this.props.complete,
                });
            }

            render() {
                return (
                    <TouchableHighlight
                        onPress={() => this.toggleComplete()}
                    >
                        <View style={{flex: 1, height: 48, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 8}}>
                                <Text>{this.props.title}</Text>
                            </View>
                            <View style={{flex: 2}}>
                                {this.props.complete && (
                                    <Text>COMPLETE</Text>
                                )}
                            </View>
                        </View>
                    </TouchableHighlight>
                );
            }
        }