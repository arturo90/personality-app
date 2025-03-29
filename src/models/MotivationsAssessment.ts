import { Schema, model, models, Document } from 'mongoose';

export interface IMotivationsAssessment extends Document {
  questions: {
    id: number;
    text: string;
    options: {
      id: string;
      text: string;
      type: 'HARMONIZER' | 'DRIVER' | 'ANALYZER';
    }[];
    section: 'GOOD_TIMES' | 'CONFLICT';
  }[];
}

const questionData = [
  // Part 1: During Good Times
  {
    id: 1,
    text: "When my family is having a good day together, I feel most content when:",
    section: 'GOOD_TIMES',
    options: [
      { id: 'A', text: "I've helped someone in the family with something they care about.", type: 'HARMONIZER' },
      { id: 'B', text: "We've knocked out several things on our to-do list.", type: 'DRIVER' },
      { id: 'C', text: "Everyone has respected the family rules and routines.", type: 'ANALYZER' }
    ]
  },
  {
    id: 2,
    text: "During a peaceful family dinner, I'm most likely to:",
    section: 'GOOD_TIMES',
    options: [
      { id: 'A', text: "Ask how everyone's feeling and try to keep the conversation flowing.", type: 'HARMONIZER' },
      { id: 'B', text: "Bring up plans for the weekend and coordinate schedules.", type: 'DRIVER' },
      { id: 'C', text: "Listen carefully and think through what others are saying before responding.", type: 'ANALYZER' }
    ]
  },
  {
    id: 3,
    text: "When we're deciding on a family vacation destination:",
    section: 'GOOD_TIMES',
    options: [
      { id: 'A', text: "I consider whether everyone will have activities they enjoy and feel included.", type: 'HARMONIZER' },
      { id: 'B', text: "I focus on finding the option that gives us the most value and experiences.", type: 'DRIVER' },
      { id: 'C', text: "I research thoroughly to find the most sensible choice based on all factors.", type: 'ANALYZER' }
    ]
  },
  {
    id: 4,
    text: "When we're working on a home project together (like gardening or renovating):",
    section: 'GOOD_TIMES',
    options: [
      { id: 'A', text: "I'm good at encouraging everyone and making sure they feel appreciated.", type: 'HARMONIZER' },
      { id: 'B', text: "I naturally take the lead and keep things moving forward.", type: 'DRIVER' },
      { id: 'C', text: "I pay attention to details and make sure we're following the right steps.", type: 'ANALYZER' }
    ]
  },
  {
    id: 5,
    text: "At family gatherings like Thanksgiving or birthdays:",
    section: 'GOOD_TIMES',
    options: [
      { id: 'A', text: "I make sure no one feels left out and everyone's comfortable.", type: 'HARMONIZER' },
      { id: 'B', text: "I often coordinate food, activities, or gift-giving to keep things on track.", type: 'DRIVER' },
      { id: 'C', text: "I appreciate when we follow family traditions and everything has its proper place.", type: 'ANALYZER' }
    ]
  },
  {
    id: 6,
    text: "When it comes to family spending or sharing resources:",
    section: 'GOOD_TIMES',
    options: [
      { id: 'A', text: "I think we should focus on whoever needs the most help at the time.", type: 'HARMONIZER' },
      { id: 'B', text: "I believe in investing in things that will benefit the family the most.", type: 'DRIVER' },
      { id: 'C', text: "I prefer having clear rules about how we share things fairly.", type: 'ANALYZER' }
    ]
  },
  {
    id: 7,
    text: "When a family member shares their success (like a promotion or good grade):",
    section: 'GOOD_TIMES',
    options: [
      { id: 'A', text: "I'm excited to hear how they feel about it and offer encouragement.", type: 'HARMONIZER' },
      { id: 'B', text: "I congratulate them and ask what opportunities this opens up next.", type: 'DRIVER' },
      { id: 'C', text: "I thoughtfully acknowledge their achievement and consider what it means.", type: 'ANALYZER' }
    ]
  },
  {
    id: 8,
    text: "When planning a family outing on the weekend:",
    section: 'GOOD_TIMES',
    options: [
      { id: 'A', text: "I check in with everyone to make sure the plan works for each person.", type: 'HARMONIZER' },
      { id: 'B', text: "I create a clear plan with timing so we can fit everything in efficiently.", type: 'DRIVER' },
      { id: 'C', text: "I think through all options carefully and consider potential problems.", type: 'ANALYZER' }
    ]
  },
  {
    id: 9,
    text: "My family would probably describe my usual role as:",
    section: 'GOOD_TIMES',
    options: [
      { id: 'A', text: "The supportive one who keeps everyone emotionally connected.", type: 'HARMONIZER' },
      { id: 'B', text: "The energetic one who makes sure things get done.", type: 'DRIVER' },
      { id: 'C', text: "The thoughtful one who helps us make smart, well-considered decisions.", type: 'ANALYZER' }
    ]
  },
  {
    id: 10,
    text: "What makes me happiest about being with my family is:",
    section: 'GOOD_TIMES',
    options: [
      { id: 'A', text: "Seeing loved ones thrive with my support and care.", type: 'HARMONIZER' },
      { id: 'B', text: "Accomplishing things together and creating memorable experiences.", type: 'DRIVER' },
      { id: 'C', text: "Having a well-ordered household where decisions make sense.", type: 'ANALYZER' }
    ]
  },
  // Part 2: During Disagreements or Tension
  {
    id: 11,
    text: "When an argument breaks out at home, my first reaction is to:",
    section: 'CONFLICT',
    options: [
      { id: 'A', text: "Try to understand how everyone is feeling and keep people connected.", type: 'HARMONIZER' },
      { id: 'B', text: "Cut to the chase and solve the problem quickly.", type: 'DRIVER' },
      { id: 'C', text: "Take a step back to think about what's really going on before responding.", type: 'ANALYZER' }
    ]
  },
  {
    id: 12,
    text: "During a family disagreement, I worry most about:",
    section: 'CONFLICT',
    options: [
      { id: 'A', text: "Someone's feelings getting hurt in ways that damage our relationship.", type: 'HARMONIZER' },
      { id: 'B', text: "The issue taking too long to resolve and disrupting our plans.", type: 'DRIVER' },
      { id: 'C', text: "Coming to a solution that's actually fair and makes logical sense.", type: 'ANALYZER' }
    ]
  },
  {
    id: 13,
    text: "When a family member criticizes something I've done:",
    section: 'CONFLICT',
    options: [
      { id: 'A', text: "It hurts my feelings, but I try to see their side and patch things up.", type: 'HARMONIZER' },
      { id: 'B', text: "I defend my position confidently and try to move the conversation forward.", type: 'DRIVER' },
      { id: 'C', text: "I tend to get quiet while I process whether their criticism has merit.", type: 'ANALYZER' }
    ]
  },
  {
    id: 14,
    text: "During tense family situations, others would probably say I become:",
    section: 'CONFLICT',
    options: [
      { id: 'A', text: "Extra careful about people's feelings and focused on making peace.", type: 'HARMONIZER' },
      { id: 'B', text: "More direct and focused on getting the problem solved quickly.", type: 'DRIVER' },
      { id: 'C', text: "More reserved while I think about the fairest way to handle things.", type: 'ANALYZER' }
    ]
  },
  {
    id: 15,
    text: "When our family plans get canceled or fall through:",
    section: 'CONFLICT',
    options: [
      { id: 'A', text: "I check in with everyone to see how they're feeling about it.", type: 'HARMONIZER' },
      { id: 'B', text: "I immediately start working on a backup plan.", type: 'DRIVER' },
      { id: 'C', text: "I analyze what went wrong so we can prevent similar issues next time.", type: 'ANALYZER' }
    ]
  },
  {
    id: 16,
    text: "When we're dealing with family conflicts, my best quality is:",
    section: 'CONFLICT',
    options: [
      { id: 'A', text: "Being able to understand different perspectives and find middle ground.", type: 'HARMONIZER' },
      { id: 'B', text: "Taking action and pushing toward a clear resolution.", type: 'DRIVER' },
      { id: 'C', text: "Staying calm and thinking things through objectively.", type: 'ANALYZER' }
    ]
  },
  {
    id: 17,
    text: "When making tough decisions during family disagreements:",
    section: 'CONFLICT',
    options: [
      { id: 'A', text: "I'm most concerned that everyone feels their voice was heard.", type: 'HARMONIZER' },
      { id: 'B', text: "I focus on making a clear decision quickly so we can move forward.", type: 'DRIVER' },
      { id: 'C', text: "I insist on following what makes the most logical sense, even if it's unpopular.", type: 'ANALYZER' }
    ]
  },
  {
    id: 18,
    text: "When a family member is mad at me:",
    section: 'CONFLICT',
    options: [
      { id: 'A', text: "I worry about our relationship and try to make things right.", type: 'HARMONIZER' },
      { id: 'B', text: "I address the issue head-on and try to resolve it efficiently.", type: 'DRIVER' },
      { id: 'C', text: "I consider whether they have a valid point based on the facts.", type: 'ANALYZER' }
    ]
  },
  {
    id: 19,
    text: "When someone breaks an important family rule during an argument:",
    section: 'CONFLICT',
    options: [
      { id: 'A', text: "I try to understand the feelings or needs behind their behavior.", type: 'HARMONIZER' },
      { id: 'B', text: "I believe in clear consequences and then moving on quickly.", type: 'DRIVER' },
      { id: 'C', text: "I think carefully about how to respond in a way that's consistent with our principles.", type: 'ANALYZER' }
    ]
  },
  {
    id: 20,
    text: "The worst part about family conflicts for me is:",
    section: 'CONFLICT',
    options: [
      { id: 'A', text: "The possibility that our relationships might be permanently damaged.", type: 'HARMONIZER' },
      { id: 'B', text: "That we waste time arguing instead of accomplishing what matters.", type: 'DRIVER' },
      { id: 'C', text: "When proper reasoning and principles get thrown out the window.", type: 'ANALYZER' }
    ]
  }
];

const MotivationsAssessmentSchema = new Schema({
  questions: {
    type: [{
      id: Number,
      text: String,
      section: {
        type: String,
        enum: ['GOOD_TIMES', 'CONFLICT']
      },
      options: [{
        id: String,
        text: String,
        type: {
          type: String,
          enum: ['HARMONIZER', 'DRIVER', 'ANALYZER']
        }
      }]
    }],
    default: questionData
  }
});

export default models.MotivationsAssessment || model('MotivationsAssessment', MotivationsAssessmentSchema); 