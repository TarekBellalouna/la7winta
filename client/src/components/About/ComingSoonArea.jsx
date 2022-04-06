import React from "react";

const ComingSoonArea = ({ days, hours, minutes, seconds }) => {
  return (
    <>
      <div class="coming-soon-area ptb-50">
        <div class="d-table">
          <div class="d-table-cell">
            <div class="coming-soon-content">
              <h2>We Are Launching Soon</h2>
              <div id="timer" class="flex-wrap d-flex justify-content-center">
                <div
                  id="days"
                  class="align-items-center flex-column d-flex justify-content-center"
                >{days}<span>Days</span></div> 
                <div
                  id="hours"
                  class="align-items-center flex-column d-flex justify-content-center"
                >{hours}<span>Hours</span></div>
                <div
                  id="minutes"
                  class="align-items-center flex-column d-flex justify-content-center"
                >{minutes}<span>Minutes</span></div>
                <div
                  id="seconds"
                  class="align-items-center flex-column d-flex justify-content-center"
                >{seconds}<span>Seconds</span></div>
              </div>
              <form class="newsletter-form" data-toggle="validator">
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Enter your email"
                    name="EMAIL"
                    required
                    autocomplete="off"
                  />
                </div>
                <button type="submit" class="default-btn">
                  Subscribe
                </button>
                <div id="validator-newsletter" class="form-result"></div>
                <p>
                  If you would like to be notified when your app is live, Please
                  subscribe to our mailing list.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoonArea;
