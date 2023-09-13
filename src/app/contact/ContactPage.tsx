
const ContactPage = () => {
    return (

        <main className="main">
            <div className="page-header" style={{ backgroundColor: '#f9f8f4' }}>
                <h1 className="page-title font-weight-light text-capitalize pt-2 text-8xl">Contact Us</h1>
            </div>
            <nav className="breadcrumb-nav has-border">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><a href="demo1.html">Home</a></li>
                        <li>Contact Us</li>
                    </ul>
                </div>
            </nav>
            <div className="page-content contact-page">
                <div className="container">
                    <section className="mt-10 pt-8">
                        <h2 className="title title-center mb-8">Contact Information</h2>
                        <div className="owl-carousel owl-theme row cols-lg-4 cols-md-3 cols-sm-2 cols-1 mb-10"
                            data-owl-options="{
                                'nav': false,
                                'dots': false,
                                'loop': false,
                                'margin': 20,
                                'autoplay': true,
                                'responsive': {
                                    '0': {
                                        'items': 1,
                                        'autoplay': true
                                    },
                                    '576': {
                                        'items': 2
                                    },
                                    '768': {
                                        'items': 3
                                    },
                                    '992': {
                                        'items': 4,
                                        'autoplay': false
                                    }
                                }
                            }">
                            <div className="icon-box text-center">
                                <span className="icon-box-icon mb-4">
                                    <i className="p-icon-map"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h4 className="icon-box-title">Address</h4>
                                    <p className="text-dim">121 King Street, New York</p>
                                </div>
                            </div>
                            <div className="icon-box text-center">
                                <span className="icon-box-icon mb-4">
                                    <i className="p-icon-phone-solid"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h4 className="icon-box-title">Phone Number</h4>
                                    <p className="text-dim">+1 (456) 789 000</p>
                                </div>
                            </div>
                            <div className="icon-box text-center">
                                <span className="icon-box-icon mb-4">
                                    <i className="p-icon-message"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h4 className="icon-box-title">E-mail Address</h4>
                                    <p className="text-dim">mail@example.com</p>
                                </div>
                            </div>
                            <div className="icon-box text-center">
                                <span className="icon-box-icon mb-4">
                                    <i className="p-icon-clock"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h4 className="icon-box-title">Opening Hours</h4>
                                    <p className="text-dim">Mon-Fri: 10:00 - 18:00</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </section>

                    <section className="mt-10 pt-2 mb-10 pb-8">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <figure>
                                    <img src="images/subpage/contact/1.jpg" width="600" height="557"
                                        alt="About Image" />
                                </figure>
                            </div>
                            <div className="col-md-6 pl-md-4 mt-8 mt-md-0">
                                <h2 className="title mb-1">Leave a Comment</h2>
                                <p className="mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                                </p>
                                <form action="#">
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <input type="text" id="comment-name" name="comment-name"
                                                placeholder="Your Name" required />
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <input type="email" id="comment-email" name="comment-email"
                                                placeholder="Your Email" required />
                                        </div>
                                        <div className="col-12 mb-4">
                                            <input type="text" id="comment-subject" name="comment-subject"
                                                placeholder="Your Subject" required />
                                        </div>
                                        <div className="col-12 mb-4">
                                            <textarea id="comment-message" placeholder="Your Message"
                                                required></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-dark">Send Message</button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );

}


export default ContactPage;
