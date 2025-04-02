from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer

import requests

class NewsSummaryView(APIView):
    renderer_classes = [JSONRenderer] 
    def get(self, request):
        keyword = request.GET.get("q", "technology")
        url = f"https://newsapi.org/v2/everything?q={keyword}&apiKey=5ed7cecaa24949c9868af2e47f81b774"
        response = requests.get(url)
        articles = response.json().get("articles", [])[:5]
        summaries = [{"title": a["title"], "summary": a["description"]} for a in articles if a.get("description")]
        return Response(summaries)
