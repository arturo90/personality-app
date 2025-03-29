# Personality Assessment App

A modern web application for personality assessments that helps users better understand themselves and their relationships with friends and family.

## Features

### Assessment Types
1. **Motivations & Conflict Dynamics** (Essential)
   - Understanding individual drivers
   - Behavior patterns during conflict

2. **Communication Styles** (Essential)
   - DISC profile assessment
   - Communication preference analysis

3. **Strengths & Interests**
   - Personal strength identification
   - Stress behavior patterns

4. **Emotional Awareness**
   - Big Five personality traits
   - Emotional tendency analysis

5. **Conflict Resolution Styles**
   - Problem-solving approaches
   - Conflict management strategies

6. **Reflective Exercises**
   - Self-assessment activities
   - Personal growth tracking

7. **Creative Expression for Kids**
   - Non-verbal assessment tools
   - Child-friendly interfaces

## Technical Stack

- **Frontend**: Next.js with TypeScript
- **UI Framework**: Material UI with Japandi-inspired design
- **3D Visualization**: Three.js with cute modernistic animal avatars
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js (Google + Email/Password)
- **Styling**: Tailwind CSS + Custom theme

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   GOOGLE_ID=your_google_client_id
   GOOGLE_SECRET=your_google_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/             # Reusable components
│   ├── auth/              # Authentication components
│   ├── assessment/        # Assessment-related components
│   ├── profile/           # User profile components
│   ├── visualization/     # 3D visualization components
│   ├── layout/            # Layout components
│   └── shared/            # Shared UI components
├── lib/                   # Utility functions and configurations
├── models/                # MongoDB models
├── types/                 # TypeScript type definitions
├── hooks/                 # Custom React hooks
├── styles/                # Global styles and theme
├── services/             # API services
└── utils/                # Helper functions
```

## Design Philosophy

The application follows a Japandi design philosophy, combining Japanese and Scandinavian aesthetic principles:
- Minimal and functional design
- Neutral color palette
- Clean typography
- Natural materials and textures
- Emphasis on white space
- Subtle animations and transitions

## 3D Visualization

Results are represented by cute modernistic 3D animal avatars that reflect different personality types and traits. These visualizations are:
- Engaging and memorable
- Non-judgmental and approachable
- Culturally neutral
- Suitable for all age groups

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

MIT
