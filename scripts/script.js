const songOptions = [
    {
        id:'songOne',
        score: 0,
        label: 'Juice'
    },
    {       
        id:'songTwo',
        score: 0,
        label: 'Soulmate'
    },
    {        
        id:'songThree',
        score: 0,
        label: 'Truth Hurts'
    },
    {        
        id:'songFour',
        score: 0,
        label: 'Good As Hell'
    },

    {        
        id:'songFive',
        score: 0,
        label: 'Cuz I Love U'
    },
]

function updateScore(selectedAnswer) {
    selectedOption = songOptions.find(function(opt) {
        return opt.id === selectedAnswer.id
    })

    // If selectedOption is not undefined, update the score
    if(selectedOption) {
        selectedOption.score++;
    }

}

function sortSongOptions (a, b) {
    return  a.score > b.score ? -1: 1;
}

function onNextClick(e) {
    const isAnswerSelected = $(e.target).parent().find('input:checked').length > 0 
    // Parents is different because it goes up more than one level
    const parentSection = $(e.target).parents('section')
    //  $(e.target).parent().find('input:checked') returns an array
    // If that array has a length of 0, nothing was selected
    if (isAnswerSelected) {
        updateScore($(e.target).parent().find('input:checked')[0])
        if(parentSection.next().length > 0) {
            $(document).scrollTop(parentSection.next().offset().top)
        }
    } 
    else {
        alert("You need to select an option!");
    }
}
function displayResult(winner) {
    const popup = $('.results')
    console.log(popup)
    const popupText = popup.find('h3');
    popupText.text(`You are ${winner.label}!`)
    popup.show();
}
// on restart click map through the array of songOptions 
// set every score to = 0 
// using jq get an array of inputs that are :checked
// map through them to uncheck them and then animate the body position to top
// hide results


function onRestartClick() {
    const popup = $('.results')
    popup.hide();

    for (let i = 0; i < songOptions.length; i++) {
        const song = songOptions[i];
        song.score = 0;
    } 

    const selectedInputs = $('body').find('input:checked')
    for (let i = 0; i < selectedInputs.length; i++) {
        const input = selectedInputs[i];
        $(input).prop("checked", false);
    }
    $(document).scrollTop(0);
}




//document ready
$(function(){
    $('.startQuiz').on('click', function(e) {
        e.preventDefault();

        const header = $(e.target).parents('header')
        console.log(header)
        $(document).scrollTop(header.next().offset().top)
    })

    $('.nextQuestion').on('click', function(e) {
        e.preventDefault();
        onNextClick(e)

        
    })


    $('.finishQuiz').on('click', function(e) {
        e.preventDefault();

        onNextClick(e)
        const sortedOptions = songOptions.sort(sortSongOptions);
        displayResult(sortedOptions[0]);
    })
    $('.restart').on('click', function(e) {
        e.preventDefault();
        onRestartClick()
    })

    // const answer = true;

    // if (songAnswer != true) {
    //     console.log('')
    // } else {
    //     console.log('False, tea is l
});


// on :checked ++ 1 value to songOption
// on :submit .sort.reverse songOption
// output array item [0] and .append to bottom

//prevent next from refreshing page
// $('form').on('submit', function(e) {
//     e.preventDefault();

//     const songOption = $('input[name=songAnswer]:checked').val();
// })


// $("input").click(function(){
//     $("section").addClass("popupLizzo");
// });
