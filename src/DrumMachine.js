import React from "react";

const BANK_1 = [
    {
        keyCode: 81,
        keyName: 'Q',
        id: 'Heater-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
        keyCode: 87,
        keyName: 'W',
        id: 'Heater-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
        keyCode: 69,
        keyName: 'E',
        id: 'Heater-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
        keyCode: 65,
        keyName: 'A',
        id: 'Heater-4',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
        keyCode: 83,
        keyName: 'S',
        id: 'Clap',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
        keyCode: 68,
        keyName: 'D',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
        keyCode: 90,
        keyName: 'Z',
        id: "Kick-n-Hat",
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
        keyCode: 88,
        keyName: 'X',
        id: 'Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
        keyCode: 67,
        keyName: 'C',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
];

const BANK_2 = [
    {
        keyCode: 81,
        keyName: 'Q',
        id: 'Chord-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
        keyCode: 87,
        keyName: 'W',
        id: 'Chord-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
        keyCode: 69,
        keyName: 'E',
        id: 'Chord-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
        keyCode: 65,
        keyName: 'A',
        id: 'Shaker',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
        keyCode: 83,
        keyName: 'S',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
        keyCode: 68,
        keyName: 'D',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
        keyCode: 90,
        keyName: 'Z',
        id: 'Punchy-Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
        keyCode: 88,
        keyName: 'X',
        id: 'Side-Stick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
        keyCode: 67,
        keyName: 'C',
        id: 'Snare',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
];


export default class DrumMachine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bankMode: 'Heater Kit',
            bankKit: BANK_1,
            soundName: ''
        };
        //bindings
        this.changeBankMode = this.changeBankMode.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.playSound = this.playSound.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
    }

    handleKeyPress(event) {
        const keyCodes = this.state.bankKit.filter((item) => item.keyCode === event.keyCode);
        if(keyCodes.length > 0) {
            this.setState({
                soundName: keyCodes[0].id
            });
            this.playSound(keyCodes[0].id);
        }

    }

    playSound(id) {
        const sound = document.querySelector('#' + id + ' > audio');
        sound.currentTime = 0;
        sound.play();
    }






    changeBankMode() {
        if(this.state.bankMode === 'Heater Kit') {
            this.setState({
                bankMode: 'Smooth Piano Kit',
                bankKit: BANK_2
            });
        } else {
            this.setState({
                bankMode: 'Heater Kit',
                bankKit: BANK_1
            });
        }
    }

    handleClick(event) {
        this.setState({
            soundName: event.target.id
        });
        this.playSound(event.target.id);
    }





    render() {
        const keys = this.state.bankKit.map((item) => <button className="drum-pad" key={item.id} id={item.id} onClick={this.handleClick}>
            {item.keyName} <audio src={item.url} className="clip" id={item.keyName} type="audio/mp3"></audio>
        </button>);
        return (
            <div id="drum-machine" className="container p-5">
                <div id="display-box" className="p-3 text-center">
                    <p id="display-mode">Mode: {this.state.bankMode}</p>
                    <p id="display">Sound name: {this.state.soundName}</p>
                </div>
                <div id="key-box">
                    { //display the keys
                        keys
                    }
                </div>
                <button className="switch-mode btn" onClick={this.changeBankMode}>Switch Bank Mode</button>
            </div>
        );
    }

}
