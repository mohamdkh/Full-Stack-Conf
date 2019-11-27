/**
 * form initialization
 */
function formInit() {
    const form = document.querySelector('form')
    form.reset()
    $('#other-title').hide();
    $('#color').hide();$('#color').prev().hide();
    $('#credit-card').hide();
    $('#paypal').hide();
     $('#bitcoin').hide();

}

/**
 * @param  {} evt
 */
function updateAcivitiesRegistration(evt){
    var cost=0;
    var drapo=0;
    var s=$('.activities input');
    var m2=this.getAttribute('data-day-and-time');
    if(this.checked==true){
    for(var i=0;i<s.length;i++){
        let m1=s[i].getAttribute('data-day-and-time');
        if(m1==m2 && this.name!=s[i].name){
           $(s[i]).attr('disabled',true);
           $(s[i]).parent().addClass("activity-disabled");
        }
      }
    }
    else{
        for(var i=0;i<s.length;i++){
            let m1=s[i].getAttribute('data-day-and-time');
            if(m1==m2 && this.name!=s[i].name){
               $(s[i]).attr('disabled',false);
               $(s[i]).parent().removeClass("activity-disabled");
            }
          }
    }
    for(var i=0;i<s.length;i++){
        if(s[i].checked==true){
            var elem=$(s[i]).data('cost')
            cost+=parseInt(elem.substring(1,elem.length));
            drapo++;
        }
        
    }
    if(drapo==1){
        $('#Totalecost').remove();
      $('.activities').append('<span id="Totalecost">Total cost:  '+cost+'</span>');
        }
    else{
      $('#Totalecost').text('Total cost: \n'+cost);
    }
    
}

/**
 * called when the user selects the other option of Job role select
 */
function updateJobRole() {
    if(this.value !="other"){
        $('#other-title').hide();
     }
     else{
        $('#other-title').show();
     }
    // When the user chooses the 'other' option, 
    // the 'title' text box should be displayed
    
}

/**
 * Called when the user selects a design theme
 * @param  {} evt
 */
function updateTShirtColor(evt) {
    var col=$("#color").children("option");
    if(this.value=="JS Puns"){
        $('#color').show();
        $('#color').prev().show();
       for(var i=0;i<col.length;i++){
           if(i>3){
                 $(col[i]).prop('disabled',true);
                }
            else {
                 $(col[i]).prop('disabled',false);
                }
        }
    }
    else if(this.value=="I ♥ JS"){
        $('#color').show();
        $('#color').prev().show();
        for(var i=0;i<col.length;i++){
            if(i<4){
               $(col[i]).prop('disabled',true);
            }
            else{ 
               $(col[i]).prop('disabled',false); 
            }
            }
    }
    else{
        $('#color').hide();
        $('#color').prev().hide();
        for(var i=0;i<col.length;i++){
            $(col[i]).prop('disabled',false); 
        }
    }
    
    // depending on the color theme chosen by the user, 
    // display only the corresponding options.
    
}

/**
 * Called when the user selects the payment method
 */
function updatePaymentInfo() {
    var creditCard=$('#credit-card');
    var paypal=$('#paypal');
    var bitcoin=$('#bitcoin');
    if(this.value=='Credit Card'){
        creditCard.show();
        paypal.hide();
        bitcoin.hide();
    }
    else if(this.value=='PayPal'){
        paypal.show();
        creditCard.hide();
        bitcoin.hide();
    }
    else if(this.value=='Bitcoin'){
        bitcoin.show();
        creditCard.hide();
        paypal.hide();
    }
    else{
        creditCard.hide();
        paypal.hide();
        bitcoin.hide();
    }
    // depending on the choice of payment type, 
    // the corresponding fields are displayed.
    
}

/**
 * validate a specific rule and show error if any
 * @param  {} rule
 */
function validate(rule){
    var t=0;
    var sel=$((rule.selector).toString());
    switch(rule.type){
        case 'regExp':
            var elem=sel.val();
            var resultArray = elem.match(rule.regExp);
             if(resultArray==null){
                t=1;
             }   
            break;    
        case 'multiCheck':
            if(sel.length==0){
                t=1;
            }
            break;
        case 'empty':
            if(sel.val()==""){
                if(rule.selector=='#colors-js-puns select'){
                    $("#colors-js-puns select").is(":visible")?t=1:t=0;
                }
                else{
                    t=1;
                } 
            }
            break;    
    }
      
                
    if(t==1)
        $(rule.selector).before('<div class="error">'+rule.errorMessage+'</div>');
    // Executed for each of the rules in the table given at the end. 
    // Depending on the rule type and if there is an error, 
    // it is displayed in a 'div' tag with the class 'error' 
    // and added before the validated field
    
}

// no comment

document.addEventListener('DOMContentLoaded', formInit)



$('#title').on('change', updateJobRole)

$('.activities').on('change', '[type=checkbox]', updateAcivitiesRegistration)


$('#design').on('change', updateTShirtColor)

$('#payment').on('change', updatePaymentInfo)
$('form').on('submit', (evt) => {
    evt.preventDefault()
    // remove all previous errors before computing the overall validation
    $('form .error').remove()
    validationRules.forEach(validate)
})

// all validation rules array.  
const validationRules = [
    {
        type: 'regExp',
        selector: '#name', 
        regExp: /^[AZ][AZ',\.\-]+$/i,
        errorMessage: 'This field must contains at least 2 characters'
    },
    {
        type: 'regExp',
        selector: '#mail', 
        regExp: /^[^@]+@[^@]+$/,
        errorMessage: 'Please enter a valid email'
    },
    {
        type: 'regExp',
        selector: '#cc-num', 
        regExp: /^d{13,16}$/,
        errorMessage: 'Please enter a valid credit card Num'
    },
    {
        type: 'regExp',
        selector: '#zip', 
        regExp: /^d{5}$/,
        errorMessage: 'Please enter a valid zip code'
    },
    {
        type: 'regExp',
        selector: '#cvv', 
        regExp: /^d{3}$/,
        errorMessage: 'Please enter a valid CVV'
    },
    {
        type: 'multiCheck',
        tag: 'input:checked',
        selector: '.activities', 
        minValues: 1,
        errorMessage: 'Please check at least one activity'
    },
    {
        type: 'empty',
        selector: '#title', 
        errorMessage: 'Please select a job title'
    },
    {
        type: 'empty',
        selector: '#design', 
        errorMessage: 'Please select a design theme'
    },
    {
        type: 'empty',
        selector: '#colors-js-puns select', 
        errorMessage: 'Please select a color'
    },
    {
        type: 'empty',
        selector: '#exp-month', 
        errorMessage: 'Please select a month'
    },
    {
        type: 'empty',
        selector: '#exp-year', 
        errorMessage: 'Please select an expiration year'
    },
    {
        type: 'empty',
        selector: '#payment', 
        errorMessage: 'Please select a payment method'
    },
    
]
