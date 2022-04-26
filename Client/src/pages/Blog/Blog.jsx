import BlogArea from "../../components/Blog/BlogArea";
import PageTitle from "../../components/Common/PageTitle";
import Footer from "../../components/Footer/Footer";

function Blog() {
  return (
    <div className="blog-wrapper">
      <PageTitle title="Blog" />
      <BlogArea />
      <Footer />
    </div>
  );
}

export default Blog;
