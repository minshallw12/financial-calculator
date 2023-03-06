document.querySelector('.button').addEventListener('click', calculate_amortization);


function calculate_amortization() {
    axios
        .get("https://www.commercialloandirect.com/monthlyPaymentAPI.php?pv=250000&rate=6&nperiod=30&io=0&pf=12&cf=1&pt=0&mode=json")
        .then((response) => {
        console.log(response)
        let summary = response.data[0];
        let amortization_schedule = response.data[1];
        let num_of_payments = summary['Number of Payments'];
        let monthly_payment = summary['Principal + Interest Payment'];
        let total_loan_cost = summary['Total Payments'];
        let total_interest_paid = amortization_schedule['29']['Interest Paid'];
        document.querySelector('#payment').innerHTML = `$${monthly_payment}`;
        document.querySelector('#interest').innerHTML = `$${monthly_payment}`;
        document.querySelector('#cost').innerHTML = `$${monthly_payment}`;
        document.querySelector('#date').innerHTML = 'date here';
        document.querySelector('#number_of_payments').innerHTML = `${num_of_payments}`;

        // console.log(total_interest_paid)
        // console.log(summary)
        // console.log(summary['Interest Only Payment'])
    })
    .catch((error) => {
        console.log("no good 1: ", error);
    });
}