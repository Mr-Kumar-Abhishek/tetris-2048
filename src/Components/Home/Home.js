import React, { Component } from 'react';
import Blocks from './Blocks/Blocks';
import '../../Styles/Home.scss'
import leaderboardimg from '../../Images/Group-03.png'
import Axios from 'axios';
import keydown, { Keys } from 'react-keydown'
import ReactDOM from 'react-dom';
import swal from 'sweetalert2'


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            board: [
                [0, 32, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
                //  [0, 32, 0, 0],
                // [0, 0, 0, 0],
                // [0, 0, 0, 0],
                // [0, 0, 0, 0],
                // [0, 4, 0, 0],
                // [0, 64, 0, 0],
                // [0, 128, 0, 0],
                // [0, 256, 0, 0],
                // [0, 512, 0, 0]
                // [0, 32, 0, 0],
                // [0, 0, 0, 0],
                // [0, 32, 0, 0],
                // [0, 64, 0, 0],
                // [0, 128, 0, 0],
                // [0, 256, 0, 0],
                // [32, 512, 0, 0],
                // [64, 1024, 4, 0],
                // [8, 2, 64, 32]
            ],

            // [0, 0, 0, 0],
            // [0, 0, 0, 0],
            // [0, 0, 0, 0],
            // [0, 16, 0, 0],
            // [0, 32, 0, 0],
            // [0, 64, 0, 0],
            // [0, 128, 0, 0],
            // [0, 256, 0, 0],
            // [0, 512, 0, 0]
            //block class that consists of the pieces like below
            // VALUE WILL BE A FN THAT TAKES A VALUE FROM OU LIST OF VALUES. (2 4 8 16 32 64 WILD)
            // piece: { row: 0, col: 1, value: rando()}
            piece: { row: 0, col: 1, value: 32 },
            y: 0,
            x: 0,
            z: 0,
            level: 1,
            pointsToLevel: 600,
            score: 0,
            shadowScore: 0,
            scorePercentageMet: 0,
            swapitem: 32,
            random: '',
            revolver: [2, 32],
            numbers: [2, 4, 8, 16, 32, 64, 'W', 'B'],
            highestScore: [],
            // count: 0
            // initialStart: this.state.board[0][1],
            nextItem: 64,
            swapItem: 32,
            multiplier: 1,
            key: 'n/a',
            setIntervalID: 0,
            stopped: false,
            gameover: false,
            rereset: false,
            revolved: false
        }
    }

    componentDidMount() {
        this.game()
        // this.handleRandomNumber(this.state.numbers)

        this.focusDiv()
        //Work in progress
        this.focusDiv()
        this.handleScoreBar(this.state.score)
        this.handleIncreaseLevel(this.state.pointsToLevel)
    }

    componentDidUpdate(prevProps, prevState, nextState) {
        if (prevProps.pause !== this.props.pause) {
            if (this.props.pause) {
                clearInterval(this.state.setIntervalID)
                console.log(this.state.setIntervalID)
            }
            else {
                this.game()
            }
        }

        if (prevProps.reset !== this.props.reset) {
            if (this.props.reset) {
                let newpiece = { ...this.state.piece }
                newpiece.value = this.state.random
                this.setState({
                    board: [
                        [0, this.state.random, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]],
                    score: 0,
                    y: 0,
                    piece: newpiece
                })
            }
        }

        if (prevState.shadowScore !== this.state.shadowScore) {
            if (this.state.shadowScore) {
                if (prevState.shadowScore !== this.state.shadowScore) {
                    if (this.state.shadowScore) {
                        this.handleScoreBar(this.state.shadowScore)
                        this.handleIncreaseLevel(this.state.pointsToLevel)
                    }
                }
            }
        }
        if (prevState.stopped !== this.state.stopped) {
            if (this.state.stopped) {
                console.log('fired!!!!!!!')
                // this.reDrop() 
                // this.handleRandomNumber(this.state.numbers)
            } else {

                // this.handleRandomNumber(this.state.numbers)
            }
        }
        if (prevState.gameover !== this.state.gameover) {
            if (this.state.gameover) {
                clearInterval(this.state.setIntervalID)
            } else {
                this.game()
            }
        }

        if (prevState.rereset !== this.state.rereset) {
            if (this.state.rereset) {
                let newpiece = { ...this.state.piece }
                newpiece.value = this.state.random
                this.setState({
                    board: [
                        [0, this.state.random, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]],
                    score: 0,
                    y: 0,
                    piece: newpiece
                })
                // this.game()
            }
        }


    }
    //console.log



    game = () => {
        let { board, piece } = this.state


        let id = setInterval(this.fall, 1000)
        this.setState({
            setIntervalID: id
        })

        //This interval is to test the handleScoreBar and handleIncreaseLevel methods
        setInterval(this.increaseScore, 1000)
        //***Testing for score bar */
        this.handleGetHighScore()
        this.handleScoreBar(this.state.score)
        this.handleIncreaseLevel(this.state.pointsToLevel)
        // console.log(this.state.nextItem)

    }

    changeColumn = () => {
        var { piece, key, board, x, y } = this.state
        var newboard = board.map(element => [...element])
        var newpiece = { ...piece }
        var { value, row, col } = newpiece

        switch (key) {

            case 37:
                if (x >= 0 && newboard[row + y][col + x - 1] === 0 && y < 8) {
                    newboard[row + y][col + x] = 0
                    let left = x - 1
                    this.setState({
                        board: newboard,
                        x: left,
                        key: 'n/a'
                    })
                }

                //if the piece was moved to the left or the right the piece before should equal 0
                // if the piece is moved it should be able to move again to a different place.
                // x = 0 
                // console.log(x)
                break
            case 39:
                //for some reason it is adding multiple times
                // x=0
                if (x < 2 && newboard[row + y][col + x + 1] === 0 && y < 8) {
                    newboard[row + y][col + x] = 0
                    // console.log(x)
                    let right = x + 1
                    this.setState({
                        board: newboard,
                        x: right,
                        key: 'n/a'
                    })
                }
                break;
            // case 40:
            //  let down = y+1
            //  newboard[row+y][col+x] = 0
            //  this.setState({
            //      board: newboard,
            //      y: down,
            //      key: 'n/a'
            //  })

            default:
                break;


        }
    }


    //This method is to test the handleScoreBar and handleIncreaseLevel methods
    increaseScore = () => {

        this.setState({
            score: this.state.score + 100,
            shadowScore: this.state.shadowScore + 100
        })
        // console.log(this.state.score)
        // console.log(this.state.shadowScore)
    }


    handleRandomNumber = (arr) => {
        console.log(arr)
        let randomNumber = arr[Math.floor(Math.random() * arr.length)];
        

        return randomNumber

    }

    handleScoreBar = (num) => {
        let percentageMet = ((1.00 - (((this.state.pointsToLevel - num) / this.state.pointsToLevel).toFixed(2))).toFixed(2) * 100);

        // console.log(percentageMet)
        this.setState({
            scorePercentageMet: percentageMet
        })

        // console.log(this.state.scorePercentageMet)
    }
    reDrop = () => {
        // console.log('asdofijerpghadf')
        let random = this.handleRandomNumber(this.state.numbers)
        let { piece, board, x, y, revolver } = this.state
        let newpiece = { ...piece }
        let { value, row, col } = newpiece
        let newboard = board.map(element => [...element])
        let newRevolver = [...revolver]
        newRevolver.splice(1, 1, newRevolver[0])
        newRevolver[0] = random;
        newpiece.value = newRevolver[1]
        console.log(newpiece)
        console.log(newRevolver)
        newboard[0][1] = newRevolver[1]



        this.setState({
            x: 0,
            y: 0,
            piece: newpiece,
            board: newboard,
            stopped: false,
            revolved: true,
            revolver: newRevolver
            // random: randomNumber,

        })



        // console.log(this.state)
    }

    handleIncreaseLevel = (num) => {
        if (this.state.shadowScore > num) {
            this.setState({
                pointsToLevel: num * 2,
                shadowScore: 0,
                level: this.state.level + 1,
                scorePercentageMet: '0%'
            })
            // console.log(this.state.pointsToLevel)

        }
    }

    gameover = () => {
        let { piece, board, x, y } = this.state
        let newpiece = { ...piece }
        let { value, row, col } = newpiece
        let newboard = board.map(element => [...element])
        if (newpiece.value !== newboard[row + y + 1][col + x]) {
            // this works  just need to figure out the proper thing to put in place
            // this could be an alert, but then we can figure out what we'd like
            // maybe reactjs-popup? 
            this.setState({
                gameover: true
            })
            console.log(this.state.gameover)
            swal({
                title: 'Game Over',
                text: "Play Again?",
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                console.log(result)
                this.setState({
                    rereset: true,
                    gameover: false
                })
            })
        } else {

        }
    }

    handleGetHighScore = () => {
        Axios.get('/api/getHighScore').then(res => {
            let newRes = res.data[0].score
            this.setState({
                highestScore: newRes
            })
        })
    }


    fall = () => {
        // this.changeColumn()
        this.changeColumn()
        let { piece, board, x, y } = this.state
        let newpiece = { ...piece }
        let { value, row, col } = newpiece
        let newboard = board.map(element => [...element])
        newboard.forEach(row => {
            row.forEach(column => {
                let newpiece = { ...piece }
                var { value, row, col } = newpiece
                let newboard = board.map(element => [...element])
                if (y >= 0 && y <= 8) {
                    if (y >= 0 && y <= 7) {
                        //before it moves down we want it to check first
                        // basic movement 
                        // console.log(piece)
                        if (piece.value !== 'W') {
                            if (newboard[row + y + 1][col + x] === 0) {
                                // console.log(newpiece)
                                newboard[row + y][col + x] = 0
                                // console.log('hello', x)
                                newboard[row + y + 1][col + x] = value
                                var movedown = y + 1
                                this.setState({
                                    board: newboard,
                                    y: movedown,
                                    piece: newpiece
                                })
                            }
                            // combine movement
                            else if (newboard[row + y][col + x] === newboard[row + y + 1][col + x]) {
                                // newboard + newboard(1) = new value
                                // newvalue = newboard(1)
                                // newboard = 0
                                newboard[row + y][col + x] = 0
                                newboard[row + y + 1][col + x] = value * 2
                                newpiece.value = value * 2
                                if (newboard[row + y + 1][col + x] === 2048) {
                                    newboard[row + y + 1][col + x] = 0
                                }
                                movedown = y + 1
                                this.setState({
                                    board: newboard,
                                    y: movedown,
                                    piece: newpiece
                                })

                            } else if (newboard[row + y][col + x] !== newboard[row + y + 1][col + x]) {
                                if (y <= 2) {
                                    this.gameover()
                                }
                                this.setState({
                                    stopped: true
                                })
                                this.reDrop()
                            }
                        } else if (piece.value === 'W') {
                            // console.log(piece)
                            if (newboard[row + y + 1][col + x] === 0) {
                                // console.log(newpiece)
                                newboard[row + y][col + x] = 0
                                // console.log('hello', x)
                                newboard[row + y + 1][col + x] = value
                                var movedown = y + 1
                                this.setState({
                                    board: newboard,
                                    y: movedown,
                                    piece: newpiece
                                })
                            } else if (newboard[row + y][col + x] !== newboard[row + y + 1][col + x]) {
                                console.log('hello')
                                // newboard + newboard(1) = new value
                                // newvalue = newboard(1)
                                // newboard = 0
                                newboard[row + y][col + x] = 0
                                newpiece.value = newboard[row + y + 1][col + x]
                                let doubled = newpiece.value * 2

                                newboard[row + y + 1][col + x] = doubled
                                newpiece.value = doubled
                                if (newboard[row + y + 1][col + x] === 2048) {
                                    newboard[row + y + 1][col + x] = 0
                                }
                                // if (newboard[row + y + 2][col + x] === newboard[row + y + 1][col + x]) {
                                //     newboard[row + y + 1][col + x] = 0
                                //     newboard[row + y + 2][col + x] = newpiece.value * 4
                                // }
                                movedown = y + 1
                                this.setState({
                                    board: newboard,
                                    y: movedown,
                                    piece: newpiece
                                })
                            }
                        }




                    } else {
                        // console.log('asdfh')
                        if (piece.value === 'W') {
                            newpiece.value = 0
                            newboard[row + y][col + x] = 0
                            this.setState({
                                board: newboard,
                                piece: newpiece,
                                stopped: true
                            })
                            this.reDrop()
                        }
                        else {
                            this.reDrop()
                            this.setState({
                                stopped: true
                            })
                        }
                        // I'm pretty sure I'd put the function in here.
                        // console.log('hello')

                        // let movedown = y
                        // this.setState({
                        //     board: newboard,
                        //     y: movedown
                        // })
                        // alert('hello')
                    }

                }

            })
        })
    }

    onKeyDown = (e) => {
        // console.log(e.which)
        this.setState({
            key: e.which
        })
    }

    focusDiv = () => {
        ReactDOM.findDOMNode(this.refs.theDiv).focus()
    }

    render() {
        // console.log(this.state.rereset)
        // console.log('key', this.state.key)
        let newboard = this.state.board.map((el, i) => {
            let item = el.map(number => {
                return (
                    <div>
                        <p className={`num-${number}`}>
                            {number}
                        </p>
                    </div>

                )
            })
            return (
                item
            )
        })

        return (
            <section className='container' ref="theDiv" onKeyDown={(e) => this.onKeyDown(e)} tabIndex="1">
                <header className='top-bar'>
                    <section className='leaderboard-score'>
                        <div className='leaderboard'>
                            <img id='leader' src={leaderboardimg} alt="" />
                            <h3>{this.state.highestScore}</h3>
                        </div>
                        <div className='score'>
                            <h2>{this.state.score}</h2>
                        </div>
                    </section>
                    <section className='truelevel'>
                        <h3 className='margin-right'>Level {`${this.state.level}`} </h3>
                        <div className='level'>
                            <p className='level2' style={{ width: this.state.scorePercentageMet + '%' }}></p>
                        </div>
                    </section>
                </header>
                <section className='middle'>
                    <div className='next-item'>
                        <h4>Next Item</h4>
                        <Blocks numbers={this.state.revolver[0]} />
                    </div>
                    <section className='actual-grid' >
                        {newboard}
                        <article id='game-over'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </article>
                    </section>
                    <section className='swap-item'>
                        <h4>Swap Item</h4>
                        <div>
                            <p>{this.state.swapitem}</p>
                        </div>
                    </section>
                </section>
            </section>
        )
    }
}

export default Home;