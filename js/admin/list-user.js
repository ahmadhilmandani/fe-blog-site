$(document).ready(function () {
  function initFetchData() {
    $.ajax({
      url: 'http://127.0.0.1:5000/get-all-user',
      type: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      success: function (res) {
        $('#list-user-container').html('')
        for (let index = 0; index < res.data.length; index++) {
          $('#list-user-container').append(
            `
        <tr class="bg-white">
          <td class="w-10 p-3 text-sm whitespace-nowrap">
            <a href="#" class="font-bold text-cust-yellow-700">${index + 1}</a>
          </td>
          <td class="w-[300px] p-3 text-sm whitespace-nowrap">
            ${res.data[index].name}
          </td>
          <td class="w-32 p-3 text-sm whitespace-nowrap">
            ${res.data[index].role}
          </td>
          <td class="w-32 p-3 text-sm whitespace-nowrap">
            ${res.data[index].role == 'writer' ? '-' :
              res.data[index].is_verif ? 'Terverifikasi' : 'Belum Terverifikasi'
            }
          </td>
          <td class="w-[120px] p-3 text-sm flex flex-wrap gap-3 justify-center items-center"> 
            ${!res.data[index].is_verif ? `
            <button data-id='${res.data[index].id}' class='block text-white px-3 rounded-full py-1 bg-cust-yellow-700'>
              verifikasi
            </button>` : ''}
          </td>
        </tr>
        `
          )
        }
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  initFetchData()

  $('#filter-select').change(() => {
    if ($('#filter-select').val() == 'not-verif') {
      $.ajax({
        url: 'http://127.0.0.1:5000/get-writer-need-verif',
        type: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        success: (res) => {
          $('#list-user-container').html('')
          for (let index = 0; index < res.data.length; index++) {
            $('#list-user-container').append(
              `
            <tr class="bg-white">
              <td class="w-10 p-3 text-sm whitespace-nowrap">
                <a href="#" class="font-bold text-cust-yellow-700">${index + 1}</a>
              </td>
              <td class="w-[300px] p-3 text-sm whitespace-nowrap">
                ${res.data[index].name}
              </td>
              <td class="w-32 p-3 text-sm whitespace-nowrap">
                ${res.data[index].role}
              </td>
              <td class="w-32 p-3 text-sm whitespace-nowrap">
                ${res.data[index].role == 'writer' ? '-' :
                res.data[index].is_verif ? 'Terverifikasi' : 'Belum Terverifikasi'
              }
              </td>
              <td class="w-[120px] p-3 text-sm flex flex-wrap gap-3 justify-center items-center"> 
                ${!res.data[index].is_verif ? `
                <button data-id='${res.data[index].id}' class='block text-white px-3 rounded-full py-1 bg-cust-yellow-700'>
                  verifikasi
                </button>` : ''}
              </td>
            </tr>
            `
            )
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    } else {
      initFetchData()
    }
  })


  function veriWriter(id) {
    $.ajax({
      url: `http://127.0.0.1:5000/verif-writer/${id}`,
      type: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      success: (res) => {
        window.location.reload()
      }
    }) 
  }

  $('#list-user-container').on('click', 'button[data-id]', function() {
    const userId = $(this).data('id')
    veriWriter(userId)
  });

})