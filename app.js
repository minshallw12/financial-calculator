document.querySelector('.button').addEventListener('click', calculate_amortization);


function calculate_amortization() {

    amount = document.querySelector('#amount_input').value;
    term = document.querySelector('#term_input').value;
    rate = document.querySelector('#rate_input').value;
    date = document.querySelector('#date_input').value;
 
    axios
        .get(`https://www.commercialloandirect.com/monthlyPaymentAPI.php?pv=${amount}&rate=${rate}&nperiod=${term}&io=0&pf=12&cf=1&pt=0&mode=json`)
        .then((response) => {
        console.log(response)
        let summary = response.data[0];
        let amortization_schedule = response.data[1];
        
        let num_of_payments = summary['Number of Payments'];
        let monthly_payment = summary['Principal + Interest Payment'];
        let total_loan_cost = summary['Total Payments'];
        let total_interest_paid = amortization_schedule[amortization_schedule.length-1]['Interest Paid'];
        document.querySelector('#payment').innerHTML = `$${monthly_payment.toFixed(2)}`;
        document.querySelector('#interest').innerHTML = `$${total_interest_paid.toFixed(2)}`;
        document.querySelector('#cost').innerHTML = `$${total_loan_cost.toFixed(2)}`;
        document.querySelector('#date').innerHTML = 'date here';
        document.querySelector('#number_of_payments').innerHTML = `${num_of_payments}`;


        let my_list = document.querySelector('#my_list')    
        //console.log(amortization_schedule)
        for (let year=0; year<amortization_schedule.length; year++) {
            console.log(amortization_schedule[year])
            let ul = document.createElement("ul")

            let balance = amortization_schedule[year]['Balance'];
            let interest_paid = amortization_schedule[year]['Interest Paid'];
            let principal = amortization_schedule[year]['Principal']

            ul.innerText = `Year: ${year}  Balance: ${balance}  Total Interest Paid: ${interest_paid}  Applied Principal: ${principal}`;
            my_list.appendChild(ul)
        }


    })
    .catch((error) => {
        console.log("no good 1: ", error);
    });
}