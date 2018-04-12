import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class HelloWorldApp extends Component {
	state = {
		data: {},
		isLoaded: false
	};

	// Функция которая, сделает запрос на указанную ссылку
	handleClick = () => {
		// Изза того что fetch возвращает promise мы должны использовать функцию then()
		fetch('https://facebook.github.io/react-native/movies.json').then(

			response => {
				//Проверяем ответ на статус успешности, если статус не равен 200, то выходим из функций, с помощью return
				//Можем не делать проверку!!!
				if (response.status !== 200) {
					return;
				}
				//С помощью функции .json() конвертируем ответ из json формата
				response.json().then(data => {
					// Сохроняем полученные данные в state
					this.setState({
						data: data,
						isLoaded: true
					});
				});
			}
		);
	};

	render() {
		// Проверяем загружены ли данные, если нет, то показываем кнопуку для загрузки изображения
		if (!this.state.isLoaded) {
			return (
				<View>
					<TouchableOpacity onPress={this.handleClick}>
						<Text>Give me movie!</Text>
					</TouchableOpacity>
				</View>
			);
		}

		// Когда данные загружены, показываем данные
		// Пример this.state.data.movies[0].title
		return (
			<View style={{ flex: 1 }}>
				<View style={{ height: 120, backgroundColor: 'red' }}>
					<Text>{this.state.data.movies[0].title}</Text>
				</View>
			</View>
		);
	}
}


/**    Пример полученных данных
 * 
				{
					"title": "The Basics - Networking",
					"description": "Your app fetched this from a remote endpoint!",
					"movies": [
						{ "title": "Star Wars", "releaseYear": "1977"},
						{ "title": "Back to the Future", "releaseYear": "1985"},
						{ "title": "The Matrix", "releaseYear": "1999"},
						{ "title": "Inception", "releaseYear": "2010"},
						{ "title": "Interstellar", "releaseYear": "2014"}
					]
				}
 * 
 */
