import Image from "next/image";
import vch from '../imgs/vch_logo_circle.png';
import fuse from '../imgs/fuse_logo.png';
import bugman from '../imgs/bugman_bug.png';
import '../styles/WorkExperience.css';

const WorkExperience = () => {
  return (
    <div className='dark'>
      <h1>Work Experience</h1>
      <section id='work-experience'>
        <div id='intune' className='card'>
          <div className='title-logo'>
            <h2>Vancouver Coastal Health</h2>
            <h3>Front-end Consultant</h3>
            <Image src={vch} alt='VCH_logo' />
          </div>
          <div className='text-bottom'>
            <i>July 2023 - August 2023</i>
          </div>
          <ul>
            <li>Designed a front-end portal to access general employee information and access.</li>
            <li>Tested and iterated with VCH to ensure a shared vision.</li>
            <li>Worked with Microsoft's Azure and Intune APIs.</li>
          </ul>
        </div>
        <div id='bugman' className='card'>
          <div className='title-logo'>
            <h2>the Bugman Pest Control</h2>
            <h3>Office Manager</h3>
            <Image src={bugman} alt='bugman_logo' />
          </div>
          <div className='text-bottom'>
            <i>August 2023 - Present</i>
          </div>
          <ul>
            <li>Analyzed and sold pest control solutions to customers via phone and email.</li>
            <li>Routed and scheduled a team of 7 technicians across the Fraser Valley.</li>
            <li>Managed solutions to various unexpected issues that technicians would face during the day.</li>
          </ul>
        </div>
        <div id='fuse' className='card'>
          <div className='title-logo'>
            <Image src={fuse} alt='FUSE_logo' />
            <h2>FUSE Power Washing</h2>
            <h3>Operations Manager</h3>
          </div>
          <div className='text-bottom'>
            <i>June 2021 - July 2023</i>
          </div>
          <ul>
            <li>Managed a team of 5 pressure washing technicians.</li>
            <li>Ensured a high quality service output and customer satisfaction.</li>
            <li>Involved in upper-level financial and business planning decisions.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default WorkExperience;