import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12 px-4'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8'>Privacy Policy</h1>
        
        <div className='bg-white rounded-lg shadow-lg p-8 space-y-8'>
          <section>
            <h2 className='text-2xl font-bold mb-4'>1. Introduction</h2>
            <p className='text-gray-700 leading-relaxed'>
              RentIt ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our platform.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>2. Information We Collect</h2>
            <p className='text-gray-700 leading-relaxed mb-4'>We may collect information about you in a variety of ways, including:</p>
            <ul className='list-disc list-inside space-y-2 text-gray-700'>
              <li><b>Account Information:</b> Name, email address, phone number, address, and payment details.</li>
              <li><b>Listing Information:</b> Photos, descriptions, pricing, location, and rental terms for items you list.</li>
              <li><b>Transaction Data:</b> Details of rental requests, bookings, and communications.</li>
              <li><b>Device Information:</b> IP address, browser type, operating system, and device identifiers.</li>
              <li><b>Location Data:</b> Approximate location for proximity-based searches and recommendations.</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>3. How We Use Your Information</h2>
            <p className='text-gray-700 leading-relaxed mb-4'>We use the information we collect to:</p>
            <ul className='list-disc list-inside space-y-2 text-gray-700'>
              <li>Provide, maintain, and improve our services.</li>
              <li>Process and complete transactions.</li>
              <li>Send transactional and promotional communications.</li>
              <li>Verify your identity and prevent fraud.</li>
              <li>Comply with legal obligations.</li>
              <li>Analyze usage patterns to enhance user experience.</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>4. Data Security</h2>
            <p className='text-gray-700 leading-relaxed'>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. 
              However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>5. Sharing Your Information</h2>
            <p className='text-gray-700 leading-relaxed mb-4'>
              We do not sell your personal information. We may share your information in limited circumstances:
            </p>
            <ul className='list-disc list-inside space-y-2 text-gray-700'>
              <li>With other users (e.g., showing your name and location to potential borrowers/lenders).</li>
              <li>With service providers who assist us in operating our platform.</li>
              <li>When required by law or to protect our rights and safety.</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>6. Your Rights</h2>
            <p className='text-gray-700 leading-relaxed mb-4'>
              Depending on your location, you may have the following rights:
            </p>
            <ul className='list-disc list-inside space-y-2 text-gray-700'>
              <li>Access your personal data.</li>
              <li>Correct inaccurate data.</li>
              <li>Request deletion of your data.</li>
              <li>Opt-out of marketing communications.</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>7. Contact Us</h2>
            <p className='text-gray-700 leading-relaxed'>
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:<br/>
              <b>Email:</b> privacy@rentit.local<br/>
              <b>Address:</b> RentIt Community Platform
            </p>
          </section>

          <section className='bg-blue-50 border-l-4 border-blue-500 p-4'>
            <p className='text-gray-700'>
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
