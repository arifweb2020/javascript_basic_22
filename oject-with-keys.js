 
 // convert object keys in array
 
 const mnth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
 
 const data = {
        202111: "true",
        202110: "true",
        202201: "false",
        202202: "true",
        202203: "true",
        202112: "true"
    }
	
	Object.keys(data)
	
	output -> ['202110', '202111', '202112', '202201', '202202', '202203']
	
	
	Object.keys(data).sort().reverse()
output -> ['202203', '202202', '202201', '202112', '202111', '202110']



Object.keys(data).sort().reverse().map((ele) => {
         return (ele.slice(-2) - 1)
           
        })
		
		output -  [2, 1, 0, 11, 10, 9]
		
		Object.keys(data).sort().reverse().map((ele) => {
         return mnth[parseInt(ele.slice(-2) - 1)]
           
        })
		
		output - ['Mar', 'Feb', 'Jan', 'Dec', 'Nov', 'Oct']
		
		

		
		///

export const socrecardMnths = (data) => {

    const mnth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // const data = {
    //     202111: "true",
    //     202110: "true",
    //     202201: "false",
    //     202202: "true",
    //     202203: "true",
    //     202112: "true"
    // }

    if(!data){
        return []
    }
    return Object.keys(data).sort().reverse().map((ele) => {
        console.log(ele)
        let tempObj = {
            Month_Label:mnth[parseInt(ele.slice(-2) - 1)],
            Payment_Status:data[ele] === "true" ? true : false
        }
        console.log(tempObj)
        return tempObj

    })


}

output - {Month_Label: 'May', Payment_Status: true}
