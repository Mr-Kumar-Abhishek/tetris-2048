import React, { Component } from 'react';
import '../../Styles/Leader.scss';
import axios from 'axios';
import Logo2 from '../../Images/Leaderboard.png'

class Leader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            players: [], //Players will be an array of objects with all players info from the database.
            scoresOfDay: [],
            scoresOfMonth: [],
            scoresOfWeek: [],
            score: 'overall',
            overallColor: false,
            dayColor: false,
            weekColor: false,
            monthColor: false,
            halo: 'overall'
        }


        this.handleDayBtn = this.handleDayBtn.bind(this);
        this.handleWeekBtn = this.handleWeekBtn.bind(this);
        this.handleOverallBtn = this.handleOverallBtn.bind(this);
        this.handleLast7Days = this.handleLast7Days.bind(this);
        this.handleLast30Days = this.handleLast30Days.bind(this);
    }

    componentDidMount() {
        axios.get('/api/getPlayers').then(res => {
            this.setState({
                players: res.data,
                overallColor: true,
                dayColor: false,
                weekColor: false,
                monthColor: false
            })
        })
    }

    handleDayBtn(array) {
        let dayScores = [];

        let today = new Date();
        
        function newDay(){

            let today = new Date();
            let dd = '' + today.getDate();
    
            if (dd.length < 2)  dd = '0' + dd;
    
            return dd
            }

        let mm = today.getMonth(); //January is 0!
        let yyyy = today.getFullYear();

        for (let i = 0; i < array.length; i++) {

            let timeStamp = array[i].time_stamp;
            let oldScore = array[i].score;

            if (timeStamp !== null && oldScore !== 0) {
                let arrayDate = timeStamp.substring(0, 10)

                if (arrayDate === yyyy + '-' + (mm + 1) + '-' + newDay()) {
                    dayScores.push(array[i])
                }
            }
        }
        let dayScores2 = dayScores.splice(0, 10)

        this.setState({
            scoresOfDay: dayScores2,
            score: 'day',
            dayColor: true,
            overallColor: false,
            weekColor: false,
            monthColor: false,
            halo: 'day'
        })

        return dayScores2

    }

    handleLast30Days() {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29].map(function (n) {
            var d = new Date();
            d.setDate(d.getDate() - n);

            return (function (year, month, day) {
                  return [year < 10 ? '0' + year : year, month < 10 ? '0' + month : month, day < 10 ? '0' + day: day].join('-');
              })(d.getFullYear(), (d.getMonth() + 1), d.getDate());
        });
    }

    handleLast7Days() {

        return '0123456'.split('').map(function (n) {
            var d = new Date();
            d.setDate(d.getDate() - n);

            return (function (year, month, day) {
                  return [year < 10 ? '0' + year : year, month < 10 ? '0' + month : month, day < 10 ? '0' + day: day].join('-');
              })(d.getFullYear(), (d.getMonth() + 1), d.getDate());
        });
    }
    

    handleWeekBtn(array) {
        let weekScores = [];
        let thisWeek = this.handleLast7Days()

        for (let i = 0; i < array.length; i++) {
            let timeStamp = array[i].time_stamp;
            let oldScore = array[i].score;

            if (timeStamp !== null && oldScore !== 0) {
                let arrayDate = timeStamp.substring(0, 10)
                for (let j = 0; j < thisWeek.length; j++) {
                    if (thisWeek[j] === arrayDate) {
                        weekScores.push(array[i])
                    }
                }

            }

        }

        let weekScore2 = weekScores.splice(0, 10)


        this.setState({
            scoresOfWeek: weekScore2,
            score: 'week',
            overallColor: false,
            dayColor: false,
            weekColor: true,
            monthColor: false,
            halo: 'week'
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

        this.setState({
            scoresOfMonth: monthScores2,
            score: 'month',
            overallColor: false,
            dayColor: false,
            weekColor: false,
            monthColor: true,
            halo: 'month'
        })

    }

    handleOverallBtn() {
        axios.get('/api/getPlayers').then(res => {
            this.setState({
                players: res.data,
                score: 'overall',
                overallColor: true,
                dayColor: false,
                weekColor: false,
                monthColor: false,
                halo: 'overall'
            })
        })
    }

    handleGoHome = () => {
        this.props.history.push('/home')
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
                <div className='container'>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '400px', margin: 'auto' }}>
                        <button id='backBtn' onClick={this.handleGoHome}><i class="fas fa-arrow-left fa-2x" style={{ marginTop: '5px'}}></i></button>
                        <img src={Logo2} alt="" style={{ width: '400px', margin: 'auto', marginBottom: '15px', marginTop: '20px'}} />

                    </div>

                    <div className='scoreBtns'>
                        <button onClick={() => this.handleDayBtn(this.state.players)} className={`${this.state.dayColor}dayScoreBtns`}>Day</button>
                        <button onClick={() => this.handleWeekBtn(this.state.players)} className={`${this.state.weekColor}weekScoreBtns`}>Week</button>
                        <button onClick={() => this.handleMonthBtn(this.state.players)} className={`${this.state.monthColor}monthScoreBtns`}>Month</button>
                        <button onClick={() => this.handleOverallBtn()} className={`${this.state.overallColor}overallScoreBtns`}>Overall</button>
                    </div>

                    <div className={`mainBox-${this.state.halo}`}>
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
                                    {this.state.score === 'overall' ? newPlayers.splice(0, 10) : this.state.score === 'day' ? showDay : this.state.score === 'month' ? showMonth : this.state.score === 'week' ? showWeek : 'overall'}
                                </div>
                            </div>
                            <div className="scoreBox">
                                {this.state.score === 'overall' ? scores.splice(0, 10) : this.state.score === 'day' ? showDayScores : this.state.score === 'month' ? showMonthScores : this.state.score === 'week' ? showWeekScores : 'overall'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Leader;