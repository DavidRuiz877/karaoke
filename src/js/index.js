const fileUrl = 'src/assets/ShapeofYouby.lrc';
let lrcFile;
let lyricsParse;

const getFileData = () =>{
    fetch(fileUrl)
    .then(response => response.text())
    .then(text => {
        lrcFile = text;
        printLyrics();
       // console.log(lrcFile);
    });
}

const printLyrics = () => {
    const htmlPlace = document.getElementById("lyrics-placeholder");
    const splitText = lrcFile.split("[");
   
    const mapArray = splitText.map(line =>{
        let newLine = line.split("]");
        return newLine;
    })
    console.log(mapArray);
    lyricsParse = mapArray.slice(4, 75);
    lyricsParse.forEach(miniArray => {
        let lyricP = document.createElement("p");
        let text = document.createTextNode(miniArray[1]);
        lyricP.setAttribute("id", miniArray[0]);
        lyricP.appendChild(text);
        htmlPlace.append(lyricP);
    })
}

const getCurrentLine = (e) =>{
    const audioElement = e.target;
    const pList = document.getElementsByTagName("p");
    const pArray = [...pList];
    audioElement.addEventListener("timeupdate", () => {
        let time = audioElement.currentTime;
        let nextLine;
        let prevLine;
        let currentLine = pArray.find((p, i) => {
            let pTime = timeFormate(p.id)
            nextLine = pArray[i + 1];
            prevLine = pArray[i - 1];
            if(nextLine){
                nextLine.classList.remove("active");
                let nextLineTime = timeFormate(nextLine.id);
                if(time > pTime && time < nextLineTime){
                    return p;
                }
              }else if(i === pArray.length - 1 && time >= pTime){
                    return p
          } 
        })
        currentLine && currentLine.classList.add("active");
        currentLine && currentLine.scrollIntoView();
        if (prevLine){
            prevLine.classList.remove("active");
            prevLine.classList.add("prev-line");
        }

        })
    }
    //Formater tiempo
        const timeFormate = (time) => {
            let splitTime = time.split(":");
            let minute = Number(splitTime[0]);
            let seconds = Number(splitTime[1]);
            if(minute > 0){
                seconds = seconds + (minute * 60);
            }
            return seconds;
        }

        window.onload = getFileData;
  

