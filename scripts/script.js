const songOptions = {
    songOne: {
        score: 0,
        // 'Juice'
    },
    songTwo: {
        score: 0,
        // 'Soulmate',
    },
    songThree: {
        score: 0,
        // 'Truth Hurts',
    },
    songFour: {
        score: 0,
        // 'Good As Hell',
    },
    songFive: {
        score: 0,
        // 'Cuz I Love U'
    }
}
function updateScore(selectedAnswer) {
    songOptions[selectedAnswer.id].score++
}

function sortSongOptions (a, b) {
    return  a.value > b.value ? 1 : -1
}


// $('form').on('submit', function(e) {
//     e.preventDefault();
// });

//document ready
$(function(){
    $('.nextQuestion').on('click', function(e) {
        e.preventDefault();
        //  $(e.target).parent().find('input:checked') returns an array
        // If that array has a length of 0, nothing was selected
        const isAnswerSelected = $(e.target).parent().find('input:checked').length > 0 

        if (isAnswerSelected) {
            updateScore($(e.target).parent().find('input:checked')[0])
        } 
    })
    $('.finishQuiz').on('click', function(e) {
        e.preventDefault();
        
        console.log(songOptions.sort(sortSongOptions))
        
        
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
