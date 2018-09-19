import React, { Component } from "react";
import "./App.css";

class App extends Component {
    state = {
        titleInput: "",
        descInput: "",
        data: []
    };

    handleTitle = event => {
        event.preventDefault();
        this.setState({
            titleInput: event.target.value
        });
    };

    handleDesc = event => {
        event.preventDefault();
        this.setState({
            descInput: event.target.value
        });
    };

    componentDidMount() {
        if (JSON.parse(localStorage.getItem("localData")) !== null) {
            const data = JSON.parse(localStorage.getItem("localData"));
            console.log(data);
            this.setState({
                data
            });
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const data = this.state.data;
        data.push([this.state.titleInput, this.state.descInput]);
        this.setState({
            data,
            titleInput: "",
            descInput: ""
        });

        localStorage.setItem("localData", JSON.stringify(this.state.data));
        console.log(JSON.stringify(localStorage.getItem("localData")));
    };
    deleteCard = i => {
        const data = this.state.data;
        data.splice(i, 1);
        this.setState({
            data
        });

        localStorage.setItem("localData", JSON.stringify(this.state.data));
        console.log(JSON.stringify(localStorage.getItem("localData")));
    };
    render() {
        return (
            <div className="App">
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleTitle}
                        className="todo-input"
                        type="text"
                        placeholder="Title"
                        value={this.state.titleInput}
                    />
                    <div className="todo-textarea-container">
                        <input
                            onChange={this.handleDesc}
                            className="todo-textarea"
                            type="text"
                            placeholder="Description"
                            value={this.state.descInput}
                        />
                        <input
                            type="submit"
                            onSubmit={this.handleSubmit}
                            className="textarea-btn"
                            value="Add"
                        />
                    </div>
                </form>
                <CardList
                    titleArr={this.state.data.map(data => data[0])}
                    descArr={this.state.data.map(data => data[1])}
                    deleteCard={this.deleteCard}
                />
            </div>
        );
    }
}

export class Card extends React.Component {
    render() {
        return (
            <div className="todo-card">
                <div className="card-title">{this.props.title}</div>
                <div className="card-text">
                    <p>{this.props.desc}</p>
                </div>
                <button
                    onClick={() => this.props.deleteCard(this.props.i)}
                    className="card-btn"
                >
                    Done
                </button>
            </div>
        );
    }
}

export class CardList extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.titleArr.map((title, i) => (
                    <Card
                        key={`card-${i}`}
                        title={title}
                        desc={this.props.descArr[i]}
                        deleteCard={this.props.deleteCard}
                        i={i}
                    />
                ))}
            </React.Fragment>
        );
    }
}

export default App;
