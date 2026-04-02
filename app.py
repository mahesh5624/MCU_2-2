from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# ── Main pages ────────────────────────────────────────────────────────────────

@app.route("/")
@app.route("/web2.html")
def home():
    return render_template("web2.html")

@app.route("/heroes.html")
def heroes():
    return render_template("heroes.html")

@app.route("/villains.html")
def villains():
    return render_template("villains.html")

@app.route("/movies.html")
def movies():
    return render_template("movies.html")

@app.route("/about2.html")
def about():
    return render_template("about2.html")

@app.route("/contact-us.html")
def contact_us():
    return render_template("contact-us.html")

@app.route("/hello.html")
def hello():
    return render_template("hello.html")

@app.route("/index.html")
def index():
    return render_template("index.html")

# ── Hero detail pages ─────────────────────────────────────────────────────────

@app.route("/ironman.html")
def ironman():
    return render_template("ironman.html")

@app.route("/spiderman.html")
def spiderman():
    return render_template("spiderman.html")

# ── Villain detail pages ──────────────────────────────────────────────────────

@app.route("/thonas.html")
def thonas():
    return render_template("thonas.html")

@app.route("/loki.html")
def loki():
    return render_template("loki.html")

# ── Movie detail pages ────────────────────────────────────────────────────────

@app.route("/ironman2008.html")
def ironman2008():
    return render_template("ironman2008.html")

@app.route("/ironman2010.html")
def ironman2010():
    return render_template("ironman2010.html")

@app.route("/iron_man_2013.html")
def iron_man_2013():
    return render_template("iron_man_2013.html")

@app.route("/thor2011.html")
def thor2011():
    return render_template("thor2011.html")

@app.route("/thor_2013.html")
def thor_2013():
    return render_template("thor_2013.html")

@app.route("/thor_2017.html")
def thor_2017():
    return render_template("thor_2017.html")

@app.route("/caption2011.html")
def caption2011():
    return render_template("caption2011.html")

@app.route("/avengers_2012.html")
def avengers_2012():
    return render_template("avengers_2012.html")

@app.route("/captian_2014.html")
def captian_2014():
    return render_template("captian_2014.html")

@app.route("/ca_2016.html")
def ca_2016():
    return render_template("ca_2016.html")

@app.route("/av_2015.html")
def av_2015():
    return render_template("av_2015.html")

@app.route("/aeg.html")
def aeg():
    return render_template("aeg.html")

@app.route("/avi.html")
def avi():
    return render_template("avi.html")

@app.route("/antman.html")
def antman():
    return render_template("antman.html")

@app.route("/antman_wasp_quantumania.html")
def antman_wasp_quantumania():
    return render_template("antman_wasp_quantumania.html")

@app.route("/am_wasp_2018.html")
def am_wasp_2018():
    return render_template("am_wasp_2018.html")

@app.route("/g.html")
def g():
    return render_template("g.html")

@app.route("/gaurdians_2017.html")
def gaurdians_2017():
    return render_template("gaurdians_2017.html")

@app.route("/gg2023.html")
def gg2023():
    return render_template("gg2023.html")

@app.route("/ds_2016.html")
def ds_2016():
    return render_template("ds_2016.html")

@app.route("/dsm.html")
def dsm():
    return render_template("dsm.html")

@app.route("/bp_2018.html")
def bp_2018():
    return render_template("bp_2018.html")

@app.route("/bpwakanda.html")
def bpwakanda():
    return render_template("bpwakanda.html")

@app.route("/bw2018.html")
def bw2018():
    return render_template("bw2018.html")

@app.route("/cap_2019.html")
def cap_2019():
    return render_template("cap_2019.html")

@app.route("/bruce_banner_into_hulk.html")
def bruce_banner_into_hulk():
    return render_template("bruce_banner_into_hulk.html")

@app.route("/sm_coming.html")
def sm_coming():
    return render_template("sm_coming.html")

@app.route("/sm_far_from_home.html")
def sm_far_from_home():
    return render_template("sm_far_from_home.html")

@app.route("/no_way.html")
def no_way():
    return render_template("no_way.html")

@app.route("/shang_chi.html")
def shang_chi():
    return render_template("shang_chi.html")

@app.route("/love_thunder.html")
def love_thunder():
    return render_template("love_thunder.html")

@app.route("/marvel2023.html")
def marvel2023():
    return render_template("marvel2023.html")

@app.route("/eternals.html")
def eternals():
    return render_template("eternals.html")

@app.route("/dp3.html")
def dp3():
    return render_template("dp3.html")

# ── Contact form endpoint ─────────────────────────────────────────────────────

@app.route("/submit_form", methods=["POST"])
def submit_form():
    data = request.get_json(silent=True) or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()
    if not (name and email and message):
        return jsonify({"success": False, "message": "All fields are required."}), 400
    # In production, persist data to a database here.
    return jsonify({"success": True, "message": "Message received! Thank you."})


if __name__ == "__main__":
    app.run()
