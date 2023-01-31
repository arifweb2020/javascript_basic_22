arr = [5, 2, 7, 1, 0]

function selectionSort(arr) {

    for (let i = 0; i < arr.length-1; i++){

        // Finding the minimum element
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++){
            if (arr[j] < arr[minIndex]) minIndex = j;
        }
 
        // Swapping the minimum element with the first element
        let temp = arr[minIndex]
        arr[minIndex] = arr[i]
        arr[i] = temp
    }

    return arr
}

console.log("Before sorting: ", arr)
console.log("After sorting: ", selectionSort(arr))



     
