import './register.css';
import { Signup } from '../../components/signup';

export function Register() {
  return (
    <div className="register">
      <div className="intro-text">
        <h1>Learn to code by watching others</h1>
        <p>
          See how experienced developers solve problems in real-time. Watching scripted tutorials is great, but understanding how developers think is
          invaluable.{' '}
        </p>
      </div>
      <div className="emphasize-offer">
        <p>
          <span>Try it free 7 days</span> then $20/mo. thereafter
        </p>
      </div>
      <div className="signup-box">
        <Signup />
      </div>
    </div>
  );
}
