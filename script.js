document.addEventListener('DOMContentLoaded', () => {
    // Original Email Functionality
    document.querySelectorAll('.councillor-email').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const card = e.target.closest('.councillor-card');
        const section = e.target.closest('.councillor-section');
        const email = card.querySelector('.councillor-email').dataset.email;
        const name = card.querySelector('strong').textContent;
        
        // Determine which section we're in
        const isMSP = section.querySelector('#mspSubject');
        const isEnvHealth = section.querySelector('#envHealthSubject');
        const isSFRS = section.querySelector('#sfrsSubject');
        
        if(isMSP) {
          generateMSPEmail(email, name);
        } else if(isEnvHealth) {
          generateEnvHealthEmail(email);
        } else if(isSFRS) {
          generateSFRSEmail(email);
        } else {
          generateCouncillorEmail(email, name);
        }
      });
    });
  
    // Gallery Implementation
    const mediaFiles = [
      { file: 'Gallery/Cammy_Response_to_Feb_16_2025_Fires_17-02-25.JPG', type: 'image' },
      { file: 'Gallery/Sanne_Response_to_Feb_16_2025_Fires_17-02-25.JPG', type: 'image' },
      { file: 'Gallery/16th_Feb_2025_Fire_Image_1_16-02-25.png', type: 'image' },
      { file: 'Gallery/Kayleigh_Response_to_Feb_16_2025_Fires_17-02-25.JPG', type: 'image' },
      { file: 'Gallery/Ben_Response_to_Feb_16_2025_Fires_18-02-25.JPG', type: 'image' },
      { file: 'Gallery/Edi_Gov_Response_to_Feb_16_2025_Fires_20-02-25.JPG', type: 'image' },
      { file: 'Ben_Email_to_Scottish_Government_10-01-25.JPG', type: 'image' },
      { file: 'Gallery/Ben_follow_up_on_setting_up_a_meeting_24-02-25.png', type: 'image' },
      { file: 'Gallery/Ben_to_Set_Up_Meeting_19-02-25.png', type: 'image' },
    ];
    
  
    // Modal Handlers
    document.querySelector('.close').addEventListener('click', () => {
      document.getElementById('mediaModal').style.display = 'none';
    });
  
    window.addEventListener('click', (event) => {
      if (event.target === document.getElementById('mediaModal')) {
        document.getElementById('mediaModal').style.display = 'none';
      }
    });
  
    // Process Media Files
    const groupedMedia = mediaFiles.reduce((acc, media) => {
      const dateStr = extractDateFromFilename(media.file);
      if (!acc[dateStr]) acc[dateStr] = [];
      acc[dateStr].push(media);
      return acc;
    }, {});
  
    const timeline = document.getElementById('mediaTimeline');
    
    Object.entries(groupedMedia)
      .sort((a, b) => new Date(b[0]) - new Date(a[0]))
      .forEach(([date, files]) => {
        const dateGroup = document.createElement('div');
        dateGroup.className = 'date-group';
        
        const header = document.createElement('h3');
        header.className = 'date-header';
        header.textContent = formatDisplayDate(date);
        dateGroup.appendChild(header);
        
        const scroller = document.createElement('div');
        scroller.className = 'media-scroller';
        
        files.forEach(media => {
          const container = document.createElement('div');
          container.className = 'media-item';
          createMediaElement(media, container);
          scroller.appendChild(container);
        });
        
        dateGroup.appendChild(scroller);
        timeline.appendChild(dateGroup);
      });
  });
  
  // Email Template Functions
  function generateCouncillorEmail(email, councillorName) {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const subject = document.getElementById("councillorSubject").value;
    let body = document.getElementById("councillorTemplate").value;
  
    if (!name || !address) {
      alert("Please fill in your name and address first");
      return;
    }
  
    body = body
      .replace(/\[Your Name\]/g, name)
      .replace(/\[Your Address\]/g, address)
      .replace("[councillorName]", councillorName);
  
    const encodedBody = encodeURIComponent(body);
    const encodedSubject = encodeURIComponent(subject);
  
    window.location.href = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
  }
  
  function generateMSPEmail(email, mspName) {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const subject = document.getElementById("mspSubject").value;
    let body = document.getElementById("mspTemplate").value;
  
    if (!name || !address) {
      alert("Please fill in your name and address first");
      return;
    }
  
    body = body
      .replace(/\[Your Name\]/g, name)
      .replace(/\[Your Address\]/g, address)
      .replace("[MSP Name]", mspName);
  
    const encodedBody = encodeURIComponent(body);
    const encodedSubject = encodeURIComponent(subject);
  
    window.location.href = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
  }
  
  function generateEnvHealthEmail(email) {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const subject = document.getElementById("envHealthSubject").value;
    let body = document.getElementById("envHealthTemplate").value;
  
    if (!name || !address) {
      alert("Please fill in your name and address first");
      return;
    }
  
    body = body
      .replace(/\[Your Name\]/g, name)
      .replace(/\[Your Address\]/g, address);
  
    const encodedBody = encodeURIComponent(body);
    const encodedSubject = encodeURIComponent(subject);
  
    window.location.href = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
  }
  
  function generateSFRSEmail(email) {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const subject = document.getElementById("sfrsSubject").value;
    let body = document.getElementById("sfrsTemplate").value;
  
    if (!name || !address) {
      alert("Please fill in your name and address first");
      return;
    }
  
    body = body
      .replace(/\[Your Name\]/g, name)
      .replace(/\[Your Address\]/g, address);
  
    const encodedBody = encodeURIComponent(body);
    const encodedSubject = encodeURIComponent(subject);
  
    window.location.href = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
  }
  
  // Media Handling Functions
  function createMediaElement(media, container) {
    const mediaElement = document.createElement(media.type === 'video' ? 'video' : 'img');
    const caption = document.createElement('div');
    caption.className = 'media-caption';
    
    // Extract display name while preserving original text before date
    const fileName = media.file.split('/').pop();
    const cleanName = fileName
      .replace(/_/g, ' ') // Convert underscores back to spaces
      .replace(/(\d{2}-\d{2}-\d{2})\.[\w]+$/, '') // Remove date and extension
      .trim()
      .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letters
  
    caption.textContent = cleanName;
    mediaElement.src = media.file;
    mediaElement.loading = 'lazy';
  
    if (media.type === 'video') {
      mediaElement.controls = true;
      mediaElement.preload = 'metadata';
    }
  
    container.appendChild(mediaElement);
    container.appendChild(caption);
    container.addEventListener('click', () => showMedia(media, cleanName));
  }
  
  
  function showMedia(media, captionText) {
    const modal = document.getElementById('mediaModal');
    const caption = document.getElementById('mediaCaption');
    const img = document.getElementById('expandedImage');
    const video = document.getElementById('expandedVideo');
  
    img.style.display = 'none';
    video.style.display = 'none';
  
    if (media.type === 'image') {
      img.src = media.file;
      img.style.display = 'block';
    } else {
      video.src = media.file;
      video.style.display = 'block';
    }
  
    caption.textContent = captionText;
    modal.style.display = 'block';
  }
  
  // Date Handling Functions
  function extractDateFromFilename(filename) {
    // Match the last occurrence of the date pattern before extension
    const dateMatch = filename.match(/(\d{2}-\d{2}-\d{2})(?=\.[\w]+$)/);
    if (!dateMatch) return 'Unknown Date';
    
    // Split into DD-MM-YY components
    const [dd, mm, yy] = dateMatch[0].split('-');
    
    // Return ISO format (YYYY-MM-DD)
    return `20${yy}-${mm}-${dd}`;
  }
  
  // Test case for "Kayleigh Response to Feb 16 2025 Fires 17-02-25.JPG"
  // Returns "2025-02-17"
  
  function formatDisplayDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }