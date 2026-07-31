import { NextResponse } from 'next/server';
import { DEFAULT_TEMU_REVIEWS } from '@/components/ReviewSection';

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      meta: {
        product_name: 'VSZAPOWER Smart Coin Cell Charger & Rechargeable Batteries',
        average_rating: 4.93,
        total_reviews_count: 1480,
        sample_reviews_count: DEFAULT_TEMU_REVIEWS.length,
        verified_source: 'Verified Buyer Reviews',
        target_applications: [
          'Apple AirTag LIR2032 Battery Replacement',
          'Car Key Fob Remotes (BMW, Audi, Mercedes, Toyota, Tesla)',
          'Smart Home IoT Sensors (Door locks, temperature sensors, glucometers)',
        ],
        safety_certifications: [
          'Battery Test Certificate',
          'CE-battery European Safety Standard',
          'FCC Electromagnetic Compatibility',
          'RoHS Eco Hazard Free',
          'UN38.3 Lithium Battery Safety Transport',
        ],
      },
      data: DEFAULT_TEMU_REVIEWS,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}
