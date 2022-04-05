import blogDetails from "../../assets/img/blog-details.jpg";
import team1 from "../../assets/img/team/team-1.jpg";
import team3 from "../../assets/img/team/team-3.jpg";
import Categories from "../Widgets/Categories";
import PopularPosts from "../Widgets/PopularPosts";
import PopularTags from "../Widgets/PopularTags";
import Search from "../Widgets/Search";

function BlogDetailsArea() {
  return (
    <section className="blog-details-area ptb-50">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-12">
            <div className="blog-details-desc">
              <div className="article-image">
                <img src={blogDetails} alt="image" />
              </div>

              <div className="article-content">
                <div className="details-content">
                  <span>eCommerce</span>
                  <h3>
                    <a href="/blog-details">
                      The Factory is Making its Own Mobile Chipset
                    </a>
                  </h3>
                  <div className="post-meta">
                    <a href="#">Admin</a> / 20 October 2020 / 2 Comments
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>

                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit.
                  </p>
                </div>

                <blockquote className="wp-block-quote">
                  <div className="icon">
                    <i className="flaticon-quote"></i>
                  </div>

                  <p>
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip.”
                  </p>
                </blockquote>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate.
                </p>

                <ul className="features-list">
                  <li>
                    <i className="bx bx-check"></i>
                    velit esse cillum dolore eu fugiat nulla pariatur.
                  </li>
                  <li>
                    <i className="bx bx-check"></i>
                    Excepteur sint occaecat cupidatat non proident.
                  </li>
                  <li>
                    <i className="bx bx-check"></i>
                    Sunt in culpa qui officia deserunt mollit anim id est
                    laborum.
                  </li>
                  <li>
                    <i className="bx bx-check"></i>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  </li>
                </ul>
              </div>

              <div className="article-footer">
                <div className="article-tags">
                  <span>
                    <i className="bx bxs-bookmark"></i>
                  </span>
                  <a href="#">Electronics</a>,<a href="#">Business</a>,
                  <a href="#">E-commerce</a>
                </div>

                <div className="article-share">
                  <ul className="social">
                    <li>
                      <span>Share:</span>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="bx bxl-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="bx bxl-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="bx bxl-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="comments-area">
                <h3 className="comments-title">Comments (02)</h3>

                <ol className="comment-list">
                  <li className="comment">
                    <div className="comment-body">
                      <footer className="comment-meta">
                        <div className="comment-author vcard">
                          <img src={team3} className="avatar" alt="image" />
                          <b className="fn">Scott Morales</b>
                        </div>
                        <div className="comment-metadata">
                          <a href="#">
                            <span>April 24, 2020 at 10:59 am</span>
                          </a>
                        </div>
                      </footer>
                      <div className="comment-content">
                        <p>
                          Lorem Ipsum has been the industry’s standard dummy
                          text ever since the 1500s, when an unknown printer
                          took a galley of type and scrambled it to make a type
                          specimen.
                        </p>
                      </div>
                      <div className="reply">
                        <a href="#" className="comment-reply-link">
                          <i className="bx bx-reply"></i> Reply
                        </a>
                      </div>
                    </div>

                    <div className="comment-body">
                      <footer className="comment-meta">
                        <div className="comment-author vcard">
                          <img src={team1} className="avatar" alt="image" />
                          <b className="fn">Eric Sessions</b>
                        </div>
                        <div className="comment-metadata">
                          <a href="#">
                            <span>April 24, 2020 at 10:59 am</span>
                          </a>
                        </div>
                      </footer>
                      <div className="comment-content">
                        <p>
                          Lorem Ipsum has been the industry’s standard dummy
                          text ever since the 1500s, when an unknown printer
                          took a galley of type and scrambled it to make a type
                          specimen.
                        </p>
                      </div>
                      <div className="reply">
                        <a href="#" className="comment-reply-link">
                          <i className="bx bx-reply"></i>Reply
                        </a>
                      </div>
                    </div>
                  </li>
                </ol>

                <div className="comment-respond">
                  <h3 className="comment-reply-title">Leave A Reply</h3>

                  <form className="comment-form">
                    <p className="comment-notes">
                      <span id="email-notes">
                        Your email address will not be published.
                      </span>
                      Required fields are marked
                      <span className="required">*</span>
                    </p>
                    <p className="comment-form-author">
                      <label>Name</label>
                      <input
                        type="text"
                        id="author"
                        name="author"
                        required="required"
                      />
                    </p>
                    <p className="comment-form-email">
                      <label>Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required="required"
                      />
                    </p>
                    <p className="comment-form-url">
                      <label>Website</label>
                      <input type="url" id="url" name="url" />
                    </p>
                    <p className="comment-form-comment">
                      <label>Comment</label>
                      <textarea
                        name="comment"
                        id="comment"
                        cols="45"
                        rows="5"
                        maxlength="65525"
                        required="required"
                      ></textarea>
                    </p>
                    <p className="comment-form-cookies-consent">
                      <input type="checkbox" value="yes" />
                      <label for="wp-comment-cookies-consent">
                        Save my name, email, and website in this browser for the
                        next time I comment.
                      </label>
                    </p>
                    <p className="form-submit">
                      <input
                        type="submit"
                        name="submit"
                        id="submit"
                        className="submit"
                        value="Post A Comment"
                      />
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-md-12">
            <aside className="widget-area">
              <div className="widget widget_search">
                <Search />
              </div>

              <div className="widget widget_categories">
                <Categories />
              </div>

              <div className="widget widget_ejon_posts_thumb">
                <PopularPosts />
              </div>

              <div className="widget widget_tag_cloud">
                <PopularTags />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogDetailsArea;
