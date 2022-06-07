const items = ["first", "second"];
  const [index, setIndex] = React.useState(0)

  const handleSubmission = () => {

    if(index >=2){
      setIndex(0)
    }
    else{
      setIndex(index +1 )
    }
  }
  return (
    <div style={{maxWidth:"50%",margin:"0 auto"}}>
      <h1>Test</h1>
      <p>{items[index]}</p>

      <button onClick={handleSubmission}>Click</button>
    </div>
