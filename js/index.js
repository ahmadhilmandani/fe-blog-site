function dinamicNav() {
  if (localStorage.getItem('token')) {
    $.ajax({
      url: 'http://127.0.0.1:5000/get-user-data',
      type: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      success: function (res) {
        if (res.role == 'writer') {
          if (res.is_verif == true) {
            $('#dinamic-nav-content').append(
              `
              <div id="logout" class="border border-slate-300 px-2 text-[13.5px] py-1 rounded-full hover:bg-slate-50 transition-all">
                Logout
              </div>
              <a href="/view/writer/dashboard.html" class="border border-slate-300 px-2 text-[13.5px] py-1 rounded-full hover:bg-slate-50 transition-all">
                List Artikel
              </a>
              <a href="/view/writer/write-article.html" class="border border-cust-yellow-700 bg-cust-yellow-700 hover:bg-cust-yellow-700/80 transition-all text-white px-2 text-[13.5px] py-1 rounded-full">
                Tulis
              </a>
              `
            )
          } else {
            $('#dinamic-nav-content').append(
              `
              <div id="logout" class="border border-slate-300 px-2 text-[13.5px] py-1 rounded-full hover:bg-slate-50 transition-all">
                Logout
              </div>
              <div class="border border-slate-300 px-2 text-[13.5px] py-1 rounded-full hover:bg-slate-50 transition-all">
               Proses Verifikasi
              </div>
              `
            )
          }
        } else if (res.role == 'admin') {
          $('#dinamic-nav-content').append(
            `
            <div id="logout" class="border border-slate-300 px-2 text-[13.5px] py-1 rounded-full hover:bg-slate-50 transition-all">
                Logout
            </div>
            <a href="/view/admin/list-article.html" class="border border-slate-300 px-2 text-[13.5px] py-1 rounded-full hover:bg-slate-50 transition-all">
              List Article
            </a>
            <a href="/view/admin/list-user.html" class="border border-cust-yellow-700 bg-cust-yellow-700 hover:bg-cust-yellow-700/80 transition-all text-white px-2 text-[13.5px] py-1 rounded-full">
              List User
            </a>
            `
          )
        } else {
          $('#dinamic-nav-content').append(

          `
          <div id="logout" class="border border-slate-300 px-2 text-[13.5px] py-1 rounded-full hover:bg-slate-50 transition-all">
            Logout
          </div>
          <div id="register-as-writer" data-id='${res.id}' class="border border-cust-yellow-700 bg-cust-yellow-700 hover:bg-cust-yellow-700/80 transition-all text-white px-2 text-[13.5px] py-1 rounded-full cursor-pointer">
            daftar jadi penulis
          </div>
          `
          )
        }
      }, error: (err) => {
        console.log(err)
      }
    })
  } else {
    $('#dinamic-nav-content').append(
      `
      <a href="/view/login.html" class="border border-slate-300 px-2 text-[13.5px] py-1 rounded-full hover:bg-slate-50 transition-all">
        Login
      </a>
      <a href="/view/register.html" class="border border-cust-yellow-700 bg-cust-yellow-700 hover:bg-cust-yellow-700/80 transition-all text-white px-2 text-[13.5px] py-1 rounded-full">
        Register
      </a>
      `
    )
  }
}

$('nav').on('click', 'div#logout', function () {
  localStorage.removeItem('token')
  window.location.href = '/view/index.html'
});

$('nav').on('click', 'div#register-as-writer', function () {
  const id = $(this).data('id')
  console.log(id)
  openConfirmationModal(id)
});

function openConfirmationModal(id) {
  $('#confirmationModal').removeClass('hidden')

  $('#confirmNo').click(() => {
    $('#confirmationModal').addClass('hidden')
  })

  $('#confirmYes').click(() => {

    $.ajax({
      url: `http://127.0.0.1:5000/add-writer/${id}`,
      type: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      success: function (res) {
        localStorage.setItem('token', res.token)
        showToast("Berhasil!", "success");
        window.location.reload()
      },
      error: (err) => {
        console.log(err)
      }, complete: () => {
        $('#confirmationModal').addClass('hidden')
      }
    })
  })
}

function showToast(message, type = "success") {
  let backgroundColor = type === "success" ? "#4CAF50" : "#F44336"; // Green for success, Red for error
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top", // Toast will appear at the top
    position: "right", // Right side
    backgroundColor: backgroundColor,
    stopOnFocus: true, // Stop dismissing on hover
  }).showToast();
}

dinamicNav()
