import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Survey from '../../../models/Survey'

const MONGODB_URI = process.env.MONGODB_URI

let isConnected = false

async function connectToDB() {
  if (isConnected) return
  if (!MONGODB_URI) throw new Error('MONGODB_URI not defined')
  await mongoose.connect(MONGODB_URI)
  isConnected = true
}

export async function POST(req) {
  await connectToDB()

  try {
    const body = await req.json()

    const { clinicalGroup, role, comments, ...responses } = body

    if (!clinicalGroup || !role) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const newSurvey = await Survey.create({
      cmg: clinicalGroup,
      role,
      responses: { ...responses, comments }
    })

    return NextResponse.json({ success: true, survey: newSurvey }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function GET() {
  await connectToDB()
  console.log("hello")

  try {
    const surveys = await Survey.find().sort({ createdAt: -1 })
    return NextResponse.json({ success: true, surveys }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}



//  import { NextResponse} from 'next/server'
//  import dbConnect from '../../../lib/mongoose'
// import Survey from '../../../model/Survey'


// export async function POST(request) {
//   await dbConnect()

//   try {
//     const data = await request.json()
//     const newSurvey = await Survey.create(data)
//     return NextResponse.json({ success: true, survey: newSurvey }, { status: 201 })
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 })
//   }
// }

// //   try {
// //     const body = await request.json();
// //     // Create a new user using the posted data
// //     const user = new User(body);
// //     await user.save();
// //     return NextResponse.json({ success: true, user }, { status: 200 });
// //   } catch (error) {
// //     return NextResponse.json(
// //       { success: false, error: error.message },
// //       { status: 500 }
// //     );
// //   }
// // }

// export async function GET() {
//   await dbConnect()
//   try {
//     const surveys = await Survey.find().sort({ createdAt: -1 })
//     return NextResponse.json({ success: true, surveys }, { status: 200 })
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 })
//   }
// }
// //   try {
// //     // Find all users
// //     const users = await User.find({});
// //     return NextResponse.json({ success: true, users }, { status: 200 });
// //   } catch (error) {
// //     return NextResponse.json(
// //       { success: false, error: error.message },
// //       { status: 500 }
// //     );
// //   }
// // }
 