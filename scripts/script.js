// Song Array with descriptions, links to songs and score key.
const songOptions = [
    {
        name:'songOne',
        score: 0,
        label: 'Juice',
        url: 'https://youtu.be/XaCrQL_8eMY',
        description: 'You know that you are cute but did you also know that you are utterly pure and divine? Baby don\'t you ever let anyone dim your shine. You can blame it on the goose, the choose or the caboose, but it\'s certainly not your fault. You the whole damn meal, and that is perfection.'
    },
    {       
        name:'songTwo',
        score: 0,
        label: 'Soulmate',
        url: 'https://youtu.be/iQJ7b_xfF2s',
        description: 'True love isn\'t something you can buy yourself and you\'re out there proving that every dang day. Loving yourself is no easy task but you are rocking it. Baby, you get those extra fries cause life is hard sometimes, and you deserve to treat yourself! '
    },
    {        
        name:'songThree',
        score: 0,
        label: 'Truth Hurts',
        url: 'https://youtu.be/P00HMxdsVZI',
        description: 'Well, you just took a Lizzo quizzo and turns out you ARE 100% that bitch, and baby thats the best way to be. Go get your nails done and feel good about who you are, because who YOU are is great and powerful and you get to set your own damn rules. '
    },
    {        
        name:'songFour',
        score: 0,
        label: 'Good As Hell',
        url: 'https://youtu.be/xZdj3LM5X1M',
        description: 'I hope you know that you are a star and you can touch the sky. You are a glorious and divine human being who deserves the whole damn world. Toss your hair, check them nails and kick down any door that stands in your way because you deserve to feel good as hell.'
    },

    {        
        name:'songFive',
        score: 0,
        label: 'Cuz I Love You',
        url: 'https://youtu.be/NqjPqsry7no',
        description: 'You know all that love that you love to give to the people in your life? I hope you know that you deserve all of that love back equally. It\'s ok to cry it out when you need to, but when you need a reminder; you are loveable, your soul is beautiful and you are worthy of so much love.'
    },
]

// 
function updateScore(selectedAnswer) {
    selectedOption = songOptions.find(function(opt) {
        return opt.name === selectedAnswer.name
    })

    // If selectedOption is not undefined, update the score
    if(selectedOption) {
        selectedOption.score++;
    }

}
// function to sort scores of songOptions in the array, highest to lowest.
function sortSongOptions (a, b) {
    return  a.score > b.score ? -1: 1;
}
// function to find :checked option in array on click of Next button
function onNextClick(e) {
    const isAnswerSelected = $(e.target).parent().find('input:checked').length > 0 
    // Parents is different because it goes up more than one level
    const parentSection = $(e.target).parents('section')
    //  $(e.target).parent().find('input:checked') returns an array
    // If that array has a length of 0, nothing was selected. Send alert to remind user to select something.
    if (isAnswerSelected) {
        updateScore($(e.target).parent().find('input:checked')[0])
        if(parentSection.next().length > 0) {
            $(document).scrollTop(parentSection.next().offset().top)
        }
    } 
    else {
        alert("Oops! 100% need to select an option or you'll never know if you're that b*tch 🥺");
    }
}
// function displays shows the normally hidden div in a pop up window
function displayResult(winner) {
    // finds and pops up the div with the class of .results
    const popup = $('.results')
    const popupText = popup.find('h5');
    // displays the information from each section of the array on the highest scoring song
    popupText.html(`<h4>Your Lizzo Banger is</h4><h3>${winner.label}</h3>
    <p class="resultDescription">${winner.description}</p>
    <a target="_blank" href="${winner.url}"><button class="listen">Listen now</button></a>`)
    popup.show();
}


// onClick function to close div with class of .results, find all inputs that are :checked, uncheck them and set score to 0 for each songOption. Function then scrolls to top of page to restart the quiz.
function onRestartClick() {
    const popup = $('.results')
    popup.hide();
    // for loop to set song score to 0
    for (let i = 0; i < songOptions.length; i++) {
        const song = songOptions[i];
        song.score = 0;
    } 
    // for loop to uncheck all options with .prop 
    const selectedInputs = $('body').find('input:checked')
    for (let i = 0; i < selectedInputs.length; i++) {
        const input = selectedInputs[i];
        $(input).prop("checked", false);
    }
    // sends to top of page on restart
    $(document).scrollTop(0);
}
//document ready
$(function(){
    // onClick of button with class of .startQuiz, prevents default action of refreshing page and begins the quiz by targeting the next sibling element of header (section)
    $('.startQuiz').on('click', function(e) {
        e.preventDefault();
        // 
        const header = $(e.target).parents('header')
        $(document).scrollTop(header.next().offset().top)
    })
    // onClick of button with class of .nextQuestion, prevents default action of refreshing the pae and moves you to next sibling section
    $('.nextQuestion').on('click', function(e) {
        e.preventDefault();
        onNextClick(e)
    })
    // onClick of button with class of .finishQuiz, prevents default action of refreshing the page and calls the function previously created to sort the song options of most to least, then displays the first number when called by callng [0] of the array.
    $('.finishQuiz').on('click', function(e) {
        e.preventDefault();
        onNextClick(e)
        const sortedOptions = songOptions.sort(sortSongOptions);
        displayResult(sortedOptions[0]);
    })
    // onClick of button with class of .restart, prevents default action of going to the 'next' section which doesnt exist (because of previous onClick function setup), and calls the function to restart the quiz.
    $('.restart').on('click', function(e) {
        e.preventDefault();
        onRestartClick()
    })
});
