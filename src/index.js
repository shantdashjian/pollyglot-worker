import OpenAI from 'openai'

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
}

export default {
	async fetch(request, env, ctx) {
		const openai = new OpenAI({
			apiKey: env.OPENAI_API_KEY,
		})

		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders })
		}

		try {
			const messages = await request.json();
			const response = await openai.chat.completions.create({
				model: 'gpt-3.5-turbo',
				messages: messages,
				temperature: 1.1,
			});
			return new Response(JSON.stringify(response.choices[0].message.content), { headers: corsHeaders });
		} catch (error) {
			return new Response(JSON.stringify({ error: error }), { status: 500, headers: corsHeaders });
		}
	},
};
