import {requestPost,request} from '@/api/parent'

export function deleteWhreceipt(whrId,init) {
  requestPost("/api/auth/site/whreceipt/delete", {whrId:whrId}).then(response => {
    if (response.data.code === 0) {
      init();
      this.$message.success("删除成功");
    }else {
      this.$message.error("删除失败");
    }
  });
}
export function deleteReceivable(receId,init) {
  requestPost("/api/auth/site/receivable/delete", {receId:receId}).then(response => {
    if (response.data.code === 0) {
      init();
      this.$message.success("删除成功");
    }else {
      this.$message.error("删除失败");
    }
  });
}

