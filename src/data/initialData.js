// Initial data for the school website
export const initialData = {
    // Site Settings
    settings: {
        schoolName: "Merryland School",
        tagline: "Nurturing Excellence, Building Future Leaders",
        logo: "/logo.png?v=2",
        email: "info@merrylandschool.edu.np",
        phone: "+977-1-4567890",
        whatsapp: "+977-9812345678",
        callNumber: "+977-1-4567890",
        address: "Kalanki, Kathmandu, Nepal",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.456!2d85.28!3d27.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQyJzAwLjAiTiA4NcKwMTYnNDguMCJF!5e0!3m2!1sen!2snp!4v1234567890",
        defaultLanguage: "en",
        supportedLanguages: ["en", "ne"],
        socialLinks: {
            facebook: "https://facebook.com/merrylandschool",
            instagram: "https://instagram.com/merrylandschool",
            twitter: "https://twitter.com/merrylandschool",
            youtube: "https://youtube.com/@merrylandschool"
        },
        videos: [
            {
                id: "1",
                title: "School Introduction",
                url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                thumbnail: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
                featured: true
            },
            {
                id: "2",
                title: "Campus Tour",
                url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
                featured: false
            }
        ]
    },

    // Admin Credentials
    admin: {
        username: "admin",
        password: "admin123"
    },

    // Home Page Content
    home: {
        hero: {
            title: "Merryland School",
            subtitle: "Welcome to Excellence",
            description: "Empowering young minds with quality education, modern facilities, and a nurturing environment for holistic development since 2010.",
            backgroundImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920"
        },
        services: [
            { title: "Academic Excellence", desc: "Rigorous curriculum designed to challenge and inspire students at every level.", icon: "FiBookOpen" },
            { title: "Expert Faculty", desc: "Dedicated teachers with years of experience nurturing every child's potential.", icon: "FiUsers" },
            { title: "Holistic Development", desc: "Focus on sports, arts, and character building alongside academics.", icon: "FiActivity" },
            { title: "Proven Results", desc: "Consistently top-ranking results in district and national examinations.", icon: "FiAward" }
        ],
        programs: [
            { title: "Primary Education", desc: "Building strong foundations for lifelong learning.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop", icon: "FiBook" },
            { title: "Secondary Education", desc: "Preparing students for higher education and beyond.", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop", icon: "FiGlobe" },
            { title: "Computer Science", desc: "Modern technology education with hands-on projects.", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop", icon: "FiCpu" },
            { title: "Arts & Music", desc: "Nurturing creativity through visual and performing arts.", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop", icon: "FiMusic" }
        ],
        features: [
            { text: "Modern Smart Classrooms", icon: "FiCheckCircle" },
            { text: "Well-Equipped Science Labs", icon: "FiCheckCircle" },
            { text: "Extensive Library Resources", icon: "FiCheckCircle" },
            { text: "Sports & Playground Facilities", icon: "FiCheckCircle" },
            { text: "Safe & Secure Campus", icon: "FiCheckCircle" },
            { text: "Experienced Teaching Staff", icon: "FiCheckCircle" }
        ],
        testimonials: [
            {
                name: "Ramesh Sharma",
                role: "Parent",
                text: "Merryland School has transformed my child's learning journey. The teachers are dedicated and the environment is perfect for growth.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
            },
            {
                name: "Sita Devi Thapa",
                role: "Parent",
                text: "I'm amazed by the holistic approach to education here. My children have excelled not just academically but in sports and arts too.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
            },
            {
                name: "Bikash Poudel",
                role: "Alumni",
                text: "The foundation I received at Merryland School helped me succeed in university. Forever grateful to my teachers!",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            }
        ],
        stats: [
            { value: "1500+", label: "Happy Students" },
            { value: "85+", label: "Expert Teachers" },
            { value: "15+", label: "Years of Excellence" },
            { value: "98%", label: "Success Rate" }
        ]
    },

    // About Page Content
    about: {
        mission: {
            title: "Our Mission",
            description: "To provide quality education that develops intellectual capabilities, builds character, and prepares students for the challenges of tomorrow."
        },
        vision: {
            title: "Our Vision",
            description: "To be the leading educational institution in Nepal, known for academic excellence, innovation, and producing well-rounded global citizens."
        },
        principal: {
            name: "Mr. Ram Prasad Sharma",
            title: "Principal",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
            message: "At Merryland School, we believe every child has the potential to achieve greatness. Our dedicated faculty works tirelessly to nurture talent, build confidence, and instill values that will guide our students throughout their lives."
        },
        team: [
            { name: "Mrs. Sita Devi Thapa", role: "Vice Principal", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
            { name: "Mr. Bikash Poudel", role: "Academic Head", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
            { name: "Mrs. Anita Gurung", role: "Admin Head", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" }
        ]
    },

    // Admissions Page Content
    admissions: {
        intro: {
            title: "Join Our Family",
            description: "We welcome students who are eager to learn, grow, and contribute. Our admissions process is designed to identify students who will thrive in our nurturing environment."
        },
        process: [
            { step: 1, title: "Submit Application", description: "Fill out the online application form with required documents." },
            { step: 2, title: "Entrance Test", description: "Appear for the entrance examination on scheduled date." },
            { step: 3, title: "Interview", description: "Attend a brief interview with the admissions committee." },
            { step: 4, title: "Admission Confirmation", description: "Complete formalities and secure your child's seat." }
        ],
        fees: {
            admission: "NPR 15,000",
            annual: "NPR 25,000",
            monthly: "NPR 5,000"
        },
        requirements: [
            "Birth Certificate (Photocopy)",
            "Previous School Leaving Certificate",
            "Character Certificate",
            "Passport Size Photos (4 copies)",
            "Parents/Guardian ID Proof"
        ],
        contact: {
            phone: "+977-1-4567890",
            email: "admissions@merrylandschool.edu.np"
        }
    },

    // Notices
    notices: [
        {
            id: "1",
            title: "Annual Sports Day Announcement",
            content: "We are excited to announce our Annual Sports Day on February 15, 2026. All students are required to participate in at least one event. Parents are cordially invited to attend and cheer for their children.",
            category: "Events",
            date: "2026-01-27",
            isLatest: true,
            isPinned: true
        },
        {
            id: "2",
            title: "Parent-Teacher Meeting Schedule",
            content: "The quarterly Parent-Teacher Meeting is scheduled for February 5, 2026. Please collect your report cards and discuss your ward's progress with respective class teachers.",
            category: "Academic",
            date: "2026-01-25",
            isLatest: false,
            isPinned: false
        },
        {
            id: "3",
            title: "Winter Vacation Notice",
            content: "School will remain closed for winter vacation from January 15-25. Classes will resume from January 26, 2026.",
            category: "Holiday",
            date: "2026-01-10",
            isLatest: false,
            isPinned: false
        },
        {
            id: "4",
            title: "Science Exhibition 2026",
            content: "Our annual Science Exhibition will be held on March 10, 2026. Students interested in participating should register with their science teachers by February 20.",
            category: "Events",
            date: "2026-01-20",
            isLatest: false,
            isPinned: false
        }
    ],

    // Blog Posts
    blogs: [
        {
            id: "1",
            title: "The Importance of Holistic Education in Modern Times",
            excerpt: "Discover why holistic education is crucial for developing well-rounded individuals in today's competitive world.",
            content: "<p>Education today goes beyond textbooks and examinations. At Merryland School, we believe in nurturing the complete individual - mind, body, and spirit.</p><p>Our approach integrates academics with sports, arts, and character development to prepare students for real-world challenges. Students participate in clubs, houses, and leadership programs that help them work in teams and communicate with confidence.</p><p>Research shows that students who receive holistic education demonstrate better problem-solving skills, emotional intelligence, and adaptability. These are the qualities that define successful individuals in the 21st century.</p><p>At Merryland School, every child is encouraged to discover their uniqueness and build a strong moral character alongside academic excellence.</p>",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop",
            author: "Principal Ram Prasad Sharma",
            category: "Education",
            date: "2026-01-25",
            published: true,
            comments: []
        },
        {
            id: "2",
            title: "Students Excel in National Science Olympiad",
            excerpt: "Our students bring home top positions and medals from the National Science Olympiad 2026.",
            content: "<p>We are proud to announce that three of our students have secured top positions in the National Science Olympiad 2026.</p><p>Priya Sharma (Class 10) won the gold medal, while Rohit Gurung and Anisha Thapa secured silver medals.</p><p>Throughout the year, our science faculty conducted special preparation classes, practice tests, and hands-on experiments to build strong conceptual understanding.</p><p>This achievement reflects the dedication of our students, the support of parents, and the tireless guidance of our exceptional science teachers.</p>",
            image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop",
            author: "Academic Department",
            category: "News",
            date: "2026-01-20",
            published: true,
            comments: []
        },
        {
            id: "3",
            title: "New Computer Lab Inaugurated",
            excerpt: "A state-of-the-art computer lab with the latest devices and high-speed internet is now open for students.",
            content: "<p>We are thrilled to announce the inauguration of our new computer lab equipped with 50 latest computers, high-speed internet, and modern software.</p><p>The lab will be used for regular computer classes, coding clubs, robotics activities, and digital literacy workshops.</p><p>With this facility, students will learn practical skills such as typing, research, presentation design, basic programming, and safe use of the internet.</p><p>We believe that strong digital skills are essential for every student to succeed in higher education and future careers.</p>",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop",
            author: "IT Department",
            category: "Technology",
            date: "2026-01-15",
            published: true,
            comments: []
        },
        {
            id: "4",
            title: "Sports Day Highlights: Celebrating Team Spirit",
            excerpt: "A colorful Sports Day filled with friendly competition, teamwork, and unforgettable memories.",
            content: "<p>Our Annual Sports Day brought the entire Merryland School family together on the school ground.</p><p>Students participated enthusiastically in track and field events, football, basketball, relay races, tug of war, and fun games for junior classes.</p><p>The house system created healthy competition as each house cheered for their teams and displayed excellent sportsmanship.</p><p>Parents and alumni also joined special events, making the day even more memorable. The program concluded with a prize distribution ceremony and a vote of thanks from the principal.</p>",
            image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=500&fit=crop",
            author: "Sports Department",
            category: "Events",
            date: "2026-01-10",
            published: true,
            comments: []
        },
        {
            id: "5",
            title: "Parent–Teacher Partnership for Student Success",
            excerpt: "How regular communication between parents and teachers helps students perform better in school.",
            content: "<p>At Merryland School, we strongly believe that education works best when parents and teachers work as a team.</p><p>Our regular Parent–Teacher Meetings give families a clear picture of their child's academic progress, behavior, and strengths.</p><p>During these interactions, teachers share practical tips on how parents can support learning at home – from creating a study routine to building good reading habits.</p><p>When parents, teachers, and students share the same goals, children feel supported and motivated to do their best.</p>",
            image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&h=500&fit=crop",
            author: "Examination Cell",
            category: "Education",
            date: "2025-12-20",
            published: true,
            comments: []
        }
    ],

    // Gallery
    gallery: [
        { id: "1", title: "School Building", category: "Campus", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop" },
        { id: "2", title: "Science Lab", category: "Facilities", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop" },
        { id: "3", title: "Annual Day Performance", category: "Events", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop" },
        { id: "4", title: "Sports Day", category: "Sports", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop" },
        { id: "5", title: "Library", category: "Facilities", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=400&fit=crop" },
        { id: "6", title: "Classroom", category: "Campus", image: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=600&h=400&fit=crop" },
        { id: "7", title: "Art Exhibition", category: "Events", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop" },
        { id: "8", title: "Computer Lab", category: "Facilities", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop" },
        { id: "9", title: "Playground", category: "Sports", image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600&h=400&fit=crop" }
    ],

    // Contact Messages (for admin)
    contactMessages: []
};
