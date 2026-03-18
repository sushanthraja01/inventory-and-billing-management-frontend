import Navbar from "../components/Navbar";

export default function ContactUsPage() {
  return (
    <>
      <Navbar />
      <div className="page-content" style={{ padding: "20px" }}>
        <br />
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;Welcome to our website inventory and billing
          management system
        </p>
        <br />
        <ul>
          <li>If you have any queries about it you can mail to any email</li>
          <br />
          <ul>
            <li>kicununani@gmail.com</li>
            <p>or</p>
            <li>rajasaidathasushanth2006@gmail.com</li>
            <p>or</p>
            <li>medhansh.kambampati@gmail.com</li>
          </ul>
        </ul>
      </div>
    </>
  );
}
