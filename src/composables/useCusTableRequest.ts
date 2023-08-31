import { computed, type Ref } from 'vue'
import CusTableRequest from '@/components/CusTableRequest.vue'

export default function useCusTableRequest(
  tableRef: Ref<InstanceType<typeof CusTableRequest> | undefined>
) {
  const tableData = computed(() => {
    return tableRef.value?.data
  })
  const pagination = computed(() => tableRef.value?.pagination)

  function queryTable(currentPage?: number) {
    if (!tableRef.value) {
      console.warn('[useCusTableRequest]: tableRef.value is undefined')
      return
    }
    tableRef.value?.query(currentPage)
  }

  return {
    queryTable,
    tableData,
    pagination
  }
}
