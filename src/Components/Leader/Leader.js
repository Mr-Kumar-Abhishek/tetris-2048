import React, { Component } from 'react';
import './Leader.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Leader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            players: [], //Players will be an array of objects with all players info from the database.
            scoresOfDay: [],
            scoresOfMonth: [],
            scoresOfWeek: [],
            score: 'Overall',

        }


        this.handleDisplayPlayers = this.handleDisplayPlayers.bind(this);
        this.handleDayBtn = this.handleDayBtn.bind(this);
        this.handleWeekBtn = this.handleWeekBtn.bind(this);
        this.handleOverallBtn = this.handleOverallBtn.bind(this);
        this.handleLast7Days = this.handleLast7Days.bind(this);
        this.handleLast30Days = this.handleLast30Days.bind(this);
    }

    componentDidMount() {
        console.log('attempting to get')
        axios.get('/api/getPlayers').then(res => {
            console.log(res.data)
            this.setState({
                players: res.data
            })
        })
    }

    handleDisplayPlayers() {
        // return this.players.map(){

        // }
    }

    handleDayBtn(array) {
        //This btn will display the highest scores of the day
        let dayScores = [];

        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth(); //January is 0!
        let yyyy = today.getFullYear();

        for (let i = 0; i < array.length; i++) {

            let timeStamp = array[i].time_stamp;
            let oldScore = array[i].score;

            if (timeStamp !== null && oldScore !== 0) {
                console.log(array[i].score)
                let arrayDate = timeStamp.substring(0, 10)

                if (arrayDate === yyyy + '-' + (mm + 1) + '-' + dd) {
                    dayScores.push(array[i])
                }
            }
        }
        let dayScores2 = dayScores.splice(0, 10)
        console.log(dayScores2)

        this.setState({
            scoresOfDay: dayScores2,
            score: 'day'
        })
        
    }

    handleLast30Days() {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29].map(function (n) {
            var d = new Date();
            d.setDate(d.getDate() - n);

            return (function (day, month, year) {
                return [day < 10 ? '0' + day : day, month < 10 ? '0' + month : month, year].join('-');
            })(d.getFullYear(), (d.getMonth() + 1), d.getDate());
        });
    }

    handleLast7Days() {

        return '0123456'.split('').map(function (n) {
            var d = new Date();
            d.setDate(d.getDate() - n);

            return (function (day, month, year) {
                return [day < 10 ? '0' + day : day, month < 10 ? '0' + month : month, year].join('-');
            })(d.getFullYear(), (d.getMonth() + 1), d.getDate());
        });
    }

    handleWeekBtn(array) {
        let weekScores = [];
        let thisWeek = this.handleLast7Days()
        console.log(thisWeek)
        console.log(array)

        for (let i = 0; i < array.length; i++) {
            let timeStamp = array[i].time_stamp;
            console.log(array[i])
            console.log(array[i].time_stamp)
            let oldScore = array[i].score;

            if (timeStamp !== null && oldScore !== 0) {
                let arrayDate = timeStamp.substring(0, 10)
                console.log(timeStamp.substring(0, 10))
                for (let j = 0; j < thisWeek.length; j++) {
                    console.log(arrayDate)
                    console.log(thisWeek[j])
                    if (thisWeek[j] === arrayDate) {
                        weekScores.push(array[i])
                    }
                }

            }

        }
        
        let weekScore2 = weekScores.splice(0, 10)
        console.log(weekScore2)


        this.setState({
            scoresOfWeek: weekScore2,
            score: 'week'
        })

    }

    handleMonthBtn(array) {
        //This button will display the highest scores of the month
        let monthScores = [];
        let thisMonth = this.handleLast30Days()

        for (let i = 0; i < array.length; i++) {
            let timeStamp = array[i].time_stamp;
            let oldScore = array[i].score;

            if (timeStamp !== null && oldScore !== 0) {
                let arrayDate = timeStamp.substring(0, 10)
                for (let j = 0; j < thisMonth.length; j++) {
                    if (thisMonth[j] === arrayDate) {
                        monthScores.push(array[i])
                    }
                }
            }

        }
        let monthScores2 = monthScores.splice(0, 10);
        console.log(monthScores2)

        this.setState({
            scoresOfMonth: monthScores2,
            score: 'month'
        })
        
    }

    handleOverallBtn() {
        axios.get('/api/getPlayers').then(res => {
            console.log(res.data)
            this.setState({
                players: res.data.splice(0, 10),
                score: 'Overall'
            })
        })
    }

    render() {

        //Maps for Overall score

        const newPlayers = this.state.players.map((el, i) => {
            return (
                <div key={el + i}>
                    <h5>{el.name}</h5>
                </div>
            )
        })

        const scores = this.state.players.map((el, i) => {
            return (
                <div key={el + i}>
                    <h5>{el.score}</h5>
                </div>
            )
        })

        //Maps for score of the day

        const showDay = this.state.scoresOfDay.map((el, i) => {
            return (
                <div key={el + i}>
                    <h5>{el.name}</h5>
                </div>
            )
        })

        const showDayScores = this.state.scoresOfDay.map((el, i) => {
            return (
                <div key={el + i}>
                    <h5>{el.score}</h5>
                </div>
            )
        })

        //Maps for score of the month

        const showMonth = this.state.scoresOfMonth.map((el, i) => {
            return (
                <div key={el + i}>
                    <h5>{el.name}</h5>
                </div>
            )
        })

        const showMonthScores = this.state.scoresOfMonth.map((el, i) => {
            return (
                <div key={el + i}>
                    <h5>{el.score}</h5>
                </div>
            )
        })

        //Maps for score of the Week

        const showWeek = this.state.scoresOfWeek.map((el, i) => {
            return (
                <div key={el + i}>
                    <h5>{el.name}</h5>
                </div>
            )
        })

        const showWeekScores = this.state.scoresOfWeek.map((el, i) => {
            return (
                <div key={el + i}>
                    <h5>{el.score}</h5>
                </div>
            )
        })

        return (
            <div className='backgroundBox'>
                <button><Link to='/'>back</Link></button>
                <h1 style={{ color: 'white' }}>Top Players</h1>

                <div className='scoreBtns'>
                    <button onClick={() => this.handleDayBtn(this.state.players)} className='scoreBtns'>Day</button>
                    <button onClick={() => this.handleWeekBtn(this.state.players)} className='scoreBtns'>Week</button>
                    <button onClick={() => this.handleMonthBtn(this.state.players)} className='scoreBtns'>Month</button>
                    <button onClick={() => this.handleOverallBtn()} className='scoreBtns'>Overall</button>
                </div>

                <div className='mainBox'>
                    <div className='pageTitles'>
                        <h3>Players
                            <hr />
                        </h3>
                        <h3 style={{ marginRight: '20px' }}>Score
                            <hr />
                        </h3>
                    </div>
                    <div className='scorePlayers'>
                        <div className='playerBox'>

                            <div className='userNames'>
                                {this.state.score === 'Overall' ? newPlayers.splice(0, 10) : this.state.score === 'day' ? showDay : this.state.score === 'month' ? showMonth : this.state.score === 'week' ? showWeek : 'Overall'}
                            </div>
                        </div>
                        <div className="scoreBox">
                            {this.state.score === 'Overall' ? scores.splice(0, 10) : this.state.score === 'day' ? showDayScores : this.state.score === 'month' ? showMonthScores : this.state.score === 'week' ? showWeekScores : 'Overall'}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Leader;