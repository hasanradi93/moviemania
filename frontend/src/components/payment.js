import React from 'react';
import '../css/movieDetails.css'

function Payment(props) {

    const submit = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <div class="container py-5" >
                <div class="row mb-4">
                    <div class="col-lg-8 mx-auto text-center">
                        <h1 class="display-6">Bootstrap Payment Forms</h1>
                    </div>
                </div>
                <div class="row" >
                    <div class="col-lg-6 mx-auto">
                        <div class="card" style={{ background: "transparent" }}>
                            <div class="card-header">
                                <div class="bg shadow-sm pt-4 pl-2 pr-2 pb-2">

                                    <ul role="tablist" class="nav nav-pills rounded nav-fill mb-3">
                                        <li style={{ background: "linear-gradient(#870f06, #c2000d)" }} class="nav-item" > <a style={{ background: "linear-gradient(#870f06, #c2000d)" }} data-toggle="pill" href="#credit-card" class="nav-link active "> <i class="fas fa-credit-card mr-2" style={{ background: "linear-gradient(#870f06, #c2000d)" }}></i> Credit Card </a> </li>
                                        <li style={{ background: "linear-gradient(#870f06, #c2000d)" }} class="nav-item"> <a style={{ background: "linear-gradient(#870f06, #c2000d)", color: "wheat" }} data-toggle="pill" href="#paypal" class="nav-link "> <i style={{ background: "linear-gradient(#870f06, #c2000d)" }} class="fab fa-paypal mr-2"></i> Paypal </a> </li>
                                        <li style={{ background: "linear-gradient(#870f06, #c2000d)", color: "wheat" }} class="nav-item"> <a style={{ background: "linear-gradient(#870f06, #c2000d)", color: "wheat" }} data-toggle="pill" href="#net-banking" class="nav-link "> <i style={{ background: "linear-gradient(#870f06, #c2000d)" }} class="fas fa-mobile-alt mr-2"></i> Net Banking </a> </li>
                                    </ul>
                                </div>

                                <div class="tab-content">

                                    <div id="credit-card" class="tab-pane fade show active pt-3">
                                        <form role="form" onSubmit={submit}>
                                            <div class="form-group"> <label for="username">
                                                <h6>Card Owner</h6>
                                            </label> <input type="text" name="username" placeholder="Card Owner Name" required class="form-control " /> </div>
                                            <div class="form-group"> <label for="cardNumber">
                                                <h6>Card number</h6>
                                            </label>
                                                <div class="input-group"> <input type="text" name="cardNumber" placeholder="Valid card number" class="form-control " required />
                                                    <div class="input-group-append"> <i class="fab fa-cc-visa mx-1"></i> <i class="fab fa-cc-mastercard mx-1"></i> <i class="fab fa-cc-amex mx-1"></i> </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-8">
                                                    <div class="form-group"> <label><span class="hidden-xs">
                                                        <h6>Expiration Date</h6>
                                                    </span></label>
                                                        <div class="input-group"> <input type="number" placeholder="MM" name="" class="form-control" required /> <input type="number" placeholder="YY" name="" class="form-control" required /> </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4">
                                                    <div class="form-group mb-4"> <label data-toggle="tooltip" title="Three digit CV code on the back of your card">
                                                        <h6>CVV <i class="fa fa-question-circle d-inline"></i></h6>
                                                    </label> <input type="text" required class="form-control" /> </div>
                                                </div>
                                            </div>
                                            <div class="card-footer">
                                                {props.finished ? <span style={{ fontSize: '14px', color: 'red' }}>Susccessfully payment done, check your profile for the Ticket</span> : <button type="button" className='payBtn' onClick={() => props.data()}> Checkout </button>}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/* <div id="paypal" class="tab-pane fade pt-3">
                                    <h6 class="pb-2">Select your paypal account type</h6>
                                    <div class="form-group "> <label class="radio-inline"> <input type="radio" name="optradio" checked /> Domestic </label> <label class="radio-inline"> <input type="radio" name="optradio" class="ml-5" />International </label></div>
                                    <p> <button type="button" class="btn btn-primary "><i class="fab fa-paypal mr-2"></i> Log into my Paypal</button> </p>
                                    <p class="text-muted"> Note: After clicking on the button, you will be directed to a secure gateway for payment. After completing the payment process, you will be redirected back to the website to view details of your order. </p>
                                </div> */}
                                {/* <div id="net-banking" class="tab-pane fade pt-3">
                                    <div class="form-group "> <label for="Select Your Bank">
                                        <h6>Select your Bank</h6>
                                    </label> <select class="form-control" id="ccmonth">
                                            <option value="" selected disabled>--Please select your Bank--</option>
                                            <option>Bank 1</option>
                                            <option>Bank 2</option>
                                            <option>Bank 3</option>
                                            <option>Bank 4</option>
                                            <option>Bank 5</option>
                                            <option>Bank 6</option>
                                            <option>Bank 7</option>
                                            <option>Bank 8</option>
                                            <option>Bank 9</option>
                                            <option>Bank 10</option>
                                        </select> </div>
                                    <div class="form-group">
                                        <p> <button type="button" class="btn btn-primary "><i class="fas fa-mobile-alt mr-2"></i> Proceed Payment</button> </p>
                                    </div>
                                    <p class="text-muted">Note: After clicking on the button, you will be directed to a secure gateway for payment. After completing the payment process, you will be redirected back to the website to view details of your order. </p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;