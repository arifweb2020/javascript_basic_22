import React from 'react';

function Otp(props) {
    const [open, setOpen] = React.useState(true)
    const [modal, setModal] = React.useState(false)
    const [disable, setDisable] = React.useState(false);
    const [send, setSend] = React.useState(true);
    const [counter, setCounter] = React.useState(0);

    const handleSubmission = () => {
        if (send === 4) {
            setSend(false)
            alert("u tried enough times")
            console.log("test")
            setTimeout(() => {
                setSend(true)
            }, 20*1000)
            
        }
        else {
            setSend(send + 1)
            alert("ok")
            console.log("timer start")
        }

    }
    const addition = () => {
        setCounter(counter + 1)
    }

    const sub = () => {

        if (counter === 0) {
            alert("stop")
        }
        else {
            setCounter(counter - 1)
        }

    }
    return (
        <div style={{ maxWidth: "40%", margin: "0 auto" }}>
            <h1>OTP PAGE</h1>
            {
                open ? <div style={{ background: "red", width: "200px", height: "200px" }}>
                    <h1>arif</h1>
                    <span onClick={() => setOpen(false)}>close</span>
                </div> : null
            }

            <button onClick={() => setModal(true)}> open </button>

            {
                modal ? <div style={{ background: "red", width: "200px", height: "200px" }}>
                    <h1>modal open</h1>
                    <span onClick={() => setModal(false)}>close</span>
                </div> : null
            }

            <button disabled={disable} onClick={() => setDisable(true)}>
                Click to Disable!
            </button>

            {
                send ? <p style={{ color: "green", cursor: "pointer" }} onClick={handleSubmission}>resend</p>
                    : <p style={{ color: "grey" }}>resend</p>
            }

            <h1>{counter}</h1>
            <button disabled={disable} onClick={addition}>
                +
            </button>
            <button disabled={disable} onClick={sub}>
                -
            </button>

        </div>
    );
}

export default Otp;
