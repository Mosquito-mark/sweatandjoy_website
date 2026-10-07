import { Plan, MovementTest, GuestbookEntry } from '../types';

export const PLANS: Plan[] = [
  {
    id: 'trial',
    name: '1-Month Trial + Assessment',
    price: 75,
    billingPeriod: 'one-time',
    description: 'Comprehensive NASM movement screening + 4-week custom program with dedicated video feedback & app access.',
    features: [
      'Comprehensive NASM kinetic chain movement screen',
      'Fully custom 4-week workout & mobility routine',
      '1x deep-dive form review video breakdown from Wally',
      'Smartphone app access for logging sets, reps & tempo',
      'No contract, no auto-renew — zero pressure'
    ],
  },
  {
    id: 'basic',
    name: 'Monthly Basic Subscription',
    price: 60,
    billingPeriod: '/ month',
    description: 'Continuous program progression, smartphone logging, and bi-weekly check-ins directly with Coach Wally.',
    features: [
      'Continuous monthly workout plan updates based on your progress',
      'Dedicated smartphone training app integration',
      'Bi-weekly asynchronous form checks & check-ins',
      'Direct email messaging with Wally (48h response window)',
      'Cancel anytime with a single click or plain email — no hassle'
    ],
    popular: true
  },
  {
    id: 'premium',
    name: 'Monthly Premium Subscription',
    price: 95,
    billingPeriod: '/ month',
    description: 'High-touch virtual coaching with unlimited video reviews, priority adjustments, and custom mobility drills.',
    features: [
      'Everything in Basic, plus unlimited video form reviews',
      'Priority 24h direct messaging directly with Wally',
      'Weekly program micro-adjustments for unexpected life shifts',
      'Customized daily desk-break mobility & ergonomics protocol',
      '100% human accountability — no algorithmic bots'
    ]
  }
];

export const SPECIALTIES = [
  {
    icon: '🏋️',
    title: 'BEGINNERS & FOUNDATION',
    blurb: 'Sustainable training plans to start your journey without second-guessing or gym anxiety.',
    detail: 'Learn proper hip hinges, braced squats, and shoulder packing without feeling judged. Wally breaks every lift down in plain English.'
  },
  {
    icon: '🌿',
    title: 'POST-PHYSIO RECOVERY',
    blurb: 'Programs built with your continued recovery and joint health in mind.',
    detail: 'Bridging the scary gap between physical therapy discharge and full gym strength. We protect repaired ACLs, rotator cuffs, and lumbar spines.'
  },
  {
    icon: '🏗️',
    title: 'MANUAL LABOURERS',
    blurb: 'Lessen aches and prevent repetitive strain injuries from heavy work.',
    detail: 'Carpenters, nurses, plumbers, and mechanics: your job is already a workout. Wally programs de-loading, thoracic recovery, and wrist/elbow preservation.'
  },
  {
    icon: '💻',
    title: 'DESK WORKERS',
    blurb: 'Combat sedentary posture aging with targeted corrective exercise.',
    detail: 'Counteract the 8-hour forward hunch. Reverse anterior pelvic tilt, wake up sleepy glutes, and eliminate afternoon neck tension.'
  },
  {
    icon: '🏳️‍⚧️',
    title: 'GENDER DIVERSE JOURNEYS',
    blurb: 'Affirming, body-positive fitness aligned with your specific silhouette & energy goals.',
    detail: 'Tailored hypertrophy, chest-safe mobility routines for binders, and welcoming coaching free from gendered fitness clichés.'
  },
  {
    icon: '⚡',
    title: 'UNCONVENTIONAL GOALS',
    blurb: 'Got weird hobbies or non-standard physical demands? Wally loves them.',
    detail: 'Gamer wrist endurance, competitive archery stance stability, weekend gardening stamina, or treehouse building readiness.'
  }
];

export const WALLY_ESSENTIALS = [
  {
    title: 'NASM Check',
    subtitle: 'Kinetic Chain Screen',
    desc: 'We identify tight overactive muscles and weak underactive ones before loading weight.',
    icon: '📐'
  },
  {
    title: 'Real Plans',
    subtitle: 'No Cookie Cutters',
    desc: 'Built specifically for your available equipment, schedule, and nagging joint history.',
    icon: '📓'
  },
  {
    title: 'App Tracking',
    subtitle: 'Pocket Companion',
    desc: 'Log weights, watch Wally’s video cues, and upload your sets for form review.',
    icon: '📱'
  },
  {
    title: 'Zero-BS',
    subtitle: 'No Auto-Renew Trap',
    desc: 'You decide every month whether Wally earned your trust. No phone trees to cancel.',
    icon: '🛡️'
  }
];

export const MOVEMENT_TESTS: MovementTest[] = [
  {
    id: 'squat',
    title: '1. The Overhead Squat Self-Screen',
    area: 'Lower Extremity & Kinetic Chain',
    description: 'Stand with feet shoulder-width, arms locked straight overhead with thumbs pointed back. Squat down to parallel 5 times.',
    instruction: 'What did you notice during the descent?',
    options: [
      {
        label: 'My feet turned out or heels wanted to lift off the floor',
        description: 'Common sign of tight gastrocnemius/soleus (calves) and restricted ankle dorsiflexion.',
        verdict: 'Overactive Calves & Ankle Limitation',
        wallyAdvice: 'Wally says: "Your ankles are acting like tight ski boots! If your calves won’t give, your lower back has to pick up the slack. We need to foam roll those gastroc knots and activate your anterior tibialis."',
        correctiveDrills: [
          'Gastroc & Soleus Foam Roll (hold tender spots 30 sec)',
          'Wall Ankle Dorsiflexion Mobilizations (2x10 each side)',
          'Heel-Elevated Goblet Squat transition drill'
        ]
      },
      {
        label: 'My knees buckled inward toward each other (Knee Valgus)',
        description: 'Tends to signify underactive gluteus medius/maximus and overactive adductors (inner thighs).',
        verdict: 'Underactive Glute Complex & Hip Instability',
        wallyAdvice: 'Wally says: "Knees kissing each other is a recipe for meniscus tears and patellar tendonitis. Your hip stabilizers are sleeping on the job while your inner thighs pull too hard!"',
        correctiveDrills: [
          'Side-Lying Clamshells with 2-sec hold (3x12)',
          'Banded Lateral Monster Walks (2x15 paces)',
          'Single-Leg Romanian Deadlift for balance'
        ]
      },
      {
        label: 'My torso leaned way forward or arms fell forward',
        description: 'Signifies tight latissimus dorsi, pectorals, and weak core/rhomboids.',
        verdict: 'Upper Cross / Tight Lats & Hip Flexors',
        wallyAdvice: 'Wally says: "Your lats are pulling your spine into a diving pose! If you lift weights like this, your lower back takes 100% of the shear force. Let’s open your chest and wake up your mid-back."',
        correctiveDrills: [
          'Kneeling Lat Stretch on Bench / Couch (hold 40 sec)',
          'Prone Cobra / Floor Y-T-W Raises (3x10 with 3-sec pause)',
          'Deadbug with diaphragmatic breath control (3x8/side)'
        ]
      },
      {
        label: 'Smooth and upright! My thighs hit parallel cleanly',
        description: 'Solid foundational mobility and stabilization throughout the kinetic chain.',
        verdict: 'Excellent Foundational Baseline',
        wallyAdvice: 'Wally says: "Hot dog! You’ve got great baseline symmetry. We can jump right into progressive strength and power stabilization without long rehab phases."',
        correctiveDrills: [
          'Barbell Front or Goblet Squat progressions',
          'Single-Leg Bulgarian Split Squats',
          'Overhead Press with neutral grip'
        ]
      }
    ]
  },
  {
    id: 'posture',
    title: '2. The Wall Angel / Desk Slump Test',
    area: 'Thoracic Spine & Shoulder Girdle',
    description: 'Stand with your back flat against a wall, heels 3 inches out. Try to touch your lower back, elbows, and back of your hands to the wall at a 90° angle.',
    instruction: 'What happened when you raised your arms?',
    options: [
      {
        label: 'My lower back arched off the wall to force hands up',
        description: 'Hyper-lordotic compensation due to tight latissimus dorsi and weak deep core stabilizers.',
        verdict: 'Thoracic Hypo-mobility & Lat Dominance',
        wallyAdvice: 'Wally says: "Your spine is cheating! When your shoulders run out of room, your lower back bends like a fishing rod. Stop crunching your spine to reach overhead."',
        correctiveDrills: [
          'Foam Roll Thoracic Spine Extensions (slow breathing)',
          'Bench Pec Minor Stretch with external rotation',
          'Half-Kneeling Overhead Press to lock the pelvis'
        ]
      },
      {
        label: 'My wrists or fingers couldn’t touch without pain',
        description: 'Internal rotator tightness (pec major/subscapularis) and weak external rotators (infraspinatus).',
        verdict: 'Forward Head & Rounded Shoulder Syndrome',
        wallyAdvice: 'Wally says: "Classic mouse-and-keyboard syndrome! Your pecs think they’re hugging a laptop 24 hours a day. We will unlock your collarbones in week 1."',
        correctiveDrills: [
          'Doorway Pectoral Stretch at 45° and 90° angles',
          'Band Face Pulls with external rotation finish (3x15)',
          'Chin Tucks / Deep Cervical Flexor nods (2x10)'
        ]
      },
      {
        label: 'Arms and back stayed glued flush with the wall comfortably',
        description: 'Superb thoracic extension and scapulothoracic rhythm.',
        verdict: 'Prime Shoulder Mobility',
        wallyAdvice: 'Wally says: "Looking like a Greek statue! You are ready for loaded vertical pulling, pull-ups, and heavy overhead work safely."',
        correctiveDrills: [
          'Loaded Pull-Ups / Weighted Dips',
          'Overhead Barbell Walking Lunges',
          'Landmine Push-Press'
        ]
      }
    ]
  }
];

export const SAMPLE_ROUTINE = {
  phase: 'Phase 1: NASM Stabilization Endurance (4-Week Block)',
  focus: 'Neuromuscular Efficiency, Core Bracing, Anti-Desk Posture',
  tempoExplanation: 'Tempo 4-2-1 means: 4 seconds lowering (eccentric), 2 seconds pause at bottom (isometric), 1 second controlled lift (concentric). Slow tempo builds bulletproof tendons!',
  days: [
    {
      day: 'Day 1: Posterior Chain & Anti-Desk Posture',
      duration: '45-50 min',
      target: 'Glutes, Upper Back, Hamstrings, Core Bracing',
      exercises: [
        {
          name: '1. Foam Roll Calves & Upper Back (SMR)',
          sets: '2 rounds',
          reps: 'Hold tender spots 30s',
          tempo: 'Slow rolling',
          cues: 'Breathe through the nose. Do not hold your breath on tender trigger points.'
        },
        {
          name: '2. Bird-Dog with 3-Sec Pause',
          sets: '3 sets',
          reps: '8 reps each side',
          tempo: '3-1-3',
          cues: 'Keep hips dead level like balancing a cup of hot coffee on your lower back.'
        },
        {
          name: '3. Dumbbell Goblet Squat to Box',
          sets: '3 sets',
          reps: '12-15 reps',
          tempo: '4-2-1',
          cues: 'Drive knees over pinky toes, chest up proud, push the floor away through mid-foot.'
        },
        {
          name: '4. Standing Resistance Band Face Pull + External Rotation',
          sets: '3 sets',
          reps: '15 reps',
          tempo: '2-1-2',
          cues: 'Pinch shoulder blades down and back, finish with thumbs pointed behind ears.'
        },
        {
          name: '5. Single-Leg Glute Bridge',
          sets: '3 sets',
          reps: '10 reps each leg',
          tempo: '3-2-1',
          cues: 'Squeeze the glute at top like you are cracking a walnut. Zero lower back strain.'
        }
      ]
    },
    {
      day: 'Day 2: Functional Push / Core Stability',
      duration: '40-45 min',
      target: 'Chest, Shoulders, Triceps, Anti-Rotation Core',
      exercises: [
        {
          name: '1. Kneeling Pec & Lat Dynamic Stretch',
          sets: '2 sets',
          reps: '10 dynamic sweeps',
          tempo: 'Fluid',
          cues: 'Open the chest with ribcage expansion.'
        },
        {
          name: '2. Push-Up with Hands on Elevation (Tempo Controlled)',
          sets: '3 sets',
          reps: '10-12 reps',
          tempo: '4-1-1',
          cues: 'Body like an iron plank. Lower slow for 4 seconds, pause 1 inch from bar.'
        },
        {
          name: '3. Half-Kneeling Landmine or Dumbbell Press',
          sets: '3 sets',
          reps: '10 reps each side',
          tempo: '3-1-1',
          cues: 'Tuck pelvis under, squeeze back glute so hip flexor is protected.'
        },
        {
          name: '4. Standing Pallof Press (Anti-Rotation)',
          sets: '3 sets',
          reps: '12 reps each side',
          tempo: '3-2-2',
          cues: 'Band tries to twist you; you refuse to budge. Iron core.'
        },
        {
          name: '5. Farmer’s Suitcase Carry (Single Dumbbell)',
          sets: '3 sets',
          reps: '40 paces per side',
          tempo: 'Marching pace',
          cues: 'Shoulders completely square. Do not tilt toward the weight.'
        }
      ]
    },
    {
      day: 'Day 3: Joint Resiliency & Lower Body Balance',
      duration: '45-50 min',
      target: 'Hips, Knee Stability, Balance, Functional Hinge',
      exercises: [
        {
          name: '1. 90/90 Hip Mobility Flow',
          sets: '2 sets',
          reps: '8 rotations per side',
          tempo: 'Controlled',
          cues: 'Keep spine tall while rotating knees from left to right.'
        },
        {
          name: '2. Romanian Deadlift (RDL) with Dumbbells',
          sets: '3 sets',
          reps: '10-12 reps',
          tempo: '4-2-1',
          cues: 'Push your butt back toward wall behind you like closing a car door with hips.'
        },
        {
          name: '3. Reverse Lunge to Single-Leg Balance',
          sets: '3 sets',
          reps: '8 reps each leg',
          tempo: '3-1-1',
          cues: 'Step back softly, drive through front heel, pause on one leg at the top for 2 sec.'
        },
        {
          name: '4. Inverted Row / TRX Suspension Pull',
          sets: '3 sets',
          reps: '10-12 reps',
          tempo: '3-1-2',
          cues: 'Pull chest directly to handles, leading with elbows.'
        },
        {
          name: '5. Deadbug with Deep Exhale',
          sets: '3 sets',
          reps: '10 alternating reps',
          tempo: '3-1-3',
          cues: 'Back stays flat on floor like crushing a grape under lumbar spine.'
        }
      ]
    }
  ]
};

export const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: 'gb-1',
    author: 'Dave M. (Software Dev)',
    location: 'Seattle, WA',
    date: '10/02/2026',
    rating: 5,
    comment: 'Wally literally fixed my chronic lower back ache in 3 weeks. No flashy gimmicks, just sensible NASM hip hinge cues and honest bi-weekly form feedback. Best $60 I spend every month.',
    badge: 'DESK WORKER',
    wallyReply: 'Wally says: You earned it Dave! You stopped rounding your spine when picking up your laptop bag. Keep crushing those bird-dogs!'
  },
  {
    id: 'gb-2',
    author: 'Elena R. (Electrician)',
    location: 'Chicago, IL',
    date: '09/27/2026',
    rating: 5,
    comment: 'Most trainers give you routines for 20-year-old bodybuilders. I crawl through attics all day. Wally looked at my work demands and built a shoulder-saving routine that actually makes my mornings painless.',
    badge: 'TRADE LABOURER',
    wallyReply: 'Wally says: Trade workers are athletes who work 8 hour shifts! Proud of your face-pull consistency Elena.'
  },
  {
    id: 'gb-3',
    author: 'Jordan T.',
    location: 'Austin, TX',
    date: '09/19/2026',
    rating: 5,
    comment: 'I was super intimidated by commercial gym trainers trying to sell me 12-month lock-in contracts. Wally’s 1-Month Trial + Assessment gave me exact form confidence. Refreshingly honest human coaching.',
    badge: 'BEGINNER FOUNDATION',
    wallyReply: 'Wally says: No auto-renew traps here! Your form on the goblet squats was textbook.'
  },
  {
    id: 'gb-4',
    author: 'Marcus K. (Age 54)',
    location: 'Denver, CO',
    date: '09/10/2026',
    rating: 5,
    comment: 'After my knee arthroscopy, my physio ended and I didn’t know what to do next. Wally bridged the gap perfectly without irritating my joint.',
    badge: 'POST-PHYSIO',
    wallyReply: 'Wally says: Slow tempos and controlled isometrics are the secret sauce. Keep those glute medius muscles fired up Marcus!'
  }
];

export const FAQS = [
  {
    q: 'Why virtual coaching instead of in-person training?',
    a: 'In-person trainers charge $80 to $150 per SINGLE hour and leave you on your own the other 167 hours of the week. With Sweat & Joy virtual coaching, you get a full custom program in your pocket, asynchronous video reviews whenever you lift, and consistent accountability for less than the cost of one single gym session.'
  },
  {
    q: 'What does "Wally ain\'t never used AI" actually mean?',
    a: 'It means Wally writes every single workout routine with his own hands, reviews your actual lifting videos with his own eyes, and answers your emails personally. No algorithmic chatbot spitting out generic copy-pasted nonsense. Real human empathy, real NASM corrective exercise certification.'
  },
  {
    q: 'How does the video form check work?',
    a: 'You record a quick 10-second clip of your squat, deadlift, or push-up from your phone and upload it in the companion app. Wally watches it, draws angles, notes kinetic chain compensations, and replies with actionable cues you can apply immediately.'
  },
  {
    q: 'What if I have weird equipment or train in my living room?',
    a: 'Wally designs around what you actually have. Two adjustable dumbbells and a backpack full of books? Full commercial gym with squat racks? Zero equipment bodyweight? Your program is tailored to your real life, not an imaginary gym.'
  },
  {
    q: 'Is there a sneaky auto-renew contract?',
    a: 'NEVER. Wally hates auto-renew scams as much as you do. The 1-Month Trial has zero renewal. The monthly memberships can be paused or cancelled at any time with a single click or a two-word email to Wally.'
  }
];
